import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react"
import Icon from '../../assets/horizon.svg?react';


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Login Submitted: ', formData);
    // Logic goes here, will come back later
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}>

        {/* Modal */}
        <div 
          className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative"
          onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            onClick={onClose}
            aria-label="Close">
            
            <X size={20} />

          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center">
              
              {/* <span className="text-white text-2xl font-bold">NB</span> */}
              <Icon className="w-8 h-8 text-green-700" />
            
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Welcome Back
          </h2>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input 
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all"
                placeholder="Enter Your Username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition-all"
                  placeholder="Enter Your Password"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>  
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#forgot-password" className="text-sm text-green-700 hover:text-green-800 hover:underline">
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <button className="w-full py-2.5 bg-blue-950 text-white rounded-lg font-medium hover:bg-green-800 transition-colors">
              Login
            </button>
          </div>

          {/* Sign Up */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#sign-up" className="text-green-700 font-medium hover:text-green-800 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  )
}