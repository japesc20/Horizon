package main

import (
	"fmt"
	"net/http"
	"northbeam-horizon/internal/database"
	"northbeam-horizon/internal/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func main() {

	database.InitDB()

	r := chi.NewRouter()

	// CORS Middleware
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // 5 mins
	}))

	// Routes
	r.Post("/auth/register", handlers.RegisterHandler)
	r.Post("/auth/login", handlers.LoginHandler)
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	fmt.Println("🚀 Server running on http://localhost:8080")
	http.ListenAndServe(":8080", r)

}
