import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, Eye, EyeOff } from "lucide-react"
import Icon from '../../assets/horizon.svg?react'

interface RegisterModalProps {
  isOpen: boolean,
  onClose: () => void;
  onLoginClick: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onLoginClick }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!res.ok) {
        const error = await res.text();
        setErrorMessage(error);
        return;
      }

      const data = await res.json();
      console.log("Registration successful: ", data);

      onClose();

    }
    catch (err) {
      console.error(err);
      setErrorMessage("Network Error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        onClick={onClose}>

        {/* Modal */}
        <div 
          className="bg-blue-950 rounded-lg shadow-2xl w-full max-w-md p-8 relative border border-green-700/30"
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
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center border-2 border-green-700">
              <Icon className="w-8 h-8 text-green-700" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-blue-900 border border-green-700/30 rounded-lg text-white placeholder-gray-500 focus:ring-1 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                placeholder="Enter Your Email"
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
                  className="w-full px-4 py-2 bg-blue-900 border border-green-700/30 rounded-lg text-white placeholder-gray-500 focus:ring-1 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder="Create a Password"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>  
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-blue-900 border border-green-700/30 rounded-lg text-white placeholder-gray-500 focus:ring-1 focus:ring-green-800 focus:border-transparent outline-none transition-all"
                  placeholder="Confirm Your Password"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 transition-colors"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>  
            </div>

            {/* Sign Up Button */}
            <button 
              onClick={handleRegister}
              className="w-full py-2.5 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg">
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button 
              onClick={onLoginClick}
              className="text-green-700 font-medium hover:text-green-500 hover:underline bg-transparent border-0 cursor-pointer">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )

}