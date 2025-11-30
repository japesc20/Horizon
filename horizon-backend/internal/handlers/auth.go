package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"northbeam-horizon/internal/database"
	"northbeam-horizon/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)

	_, err := database.DB.Exec("INSERT INTO users (email, password_hash) VALUES (?, ?)", creds.Email, string(hash))
	if err != nil {
		fmt.Println("DB Error: ", err)
		http.Error(w, "Email already exists", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message":"User Registered Successfully"}`))
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var storedHash string
	err := database.DB.QueryRow("SELECT password_hash FROM users WHERE email = ?", creds.Email).Scan(&storedHash)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(creds.Password)) != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, _ := utils.GenerateJWT(creds.Email)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
