import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react"
import Icon from '../../assets/horizon.svg?react';
import { RegisterModal } from "./RegisterModal";
import '../../index.css'


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegisterClick }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log('Login Submitted: ', formData);
  //   // Logic goes here, will come back later
  //   onClose();
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.text();
        setErrorMessage(error);
        return;
      }

      const data = await res.json();
      const token = data.token;

      localStorage.setItem("northbeam_token", token);
      setIsLoggedIn(true);

      onClose();

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage("Network Error");
    }
  }

    return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 z-70 flex items-center justify-center p-4"
        onClick={onClose}>

        {/* Modal */}
        <div 
          className="bg-brand-primary rounded-lg shadow-2xl w-full max-w-md p-8 relative border border-green-700/30"
          onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-green-700 hover:bg-blue-900 rounded transition-colors"
            onClick={onClose}
            aria-label="Close">
            
            <X size={20} />

          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand=primary rounded-full flex items-center justify-center border-2 border-green-700">
              <Icon className="w-8 h-8 text-green-700" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Welcome Back
          </h2>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-brand-primary-tint border border-green-700/30 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                placeholder="Enter Your Username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-brand-primary-tint border border-green-700/30 rounded-lg text-white placeholder-gray-400 focus:ring-1 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder="Enter Your Password"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>  
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#forgot-password" className="text-sm text-green-700 hover:text-green-500 hover:underline">
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <button 
              onClick={handleLogin}
              className="w-full py-2.5 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg">
              Login
            </button>
          </div>

          {/* Sign Up */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button 
              onClick={onRegisterClick}
              className="text-green-700 font-medium hover:text-green-500 hover:underline bg-transparent border-0 cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}