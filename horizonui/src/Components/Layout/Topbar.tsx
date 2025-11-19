import React, { useEffect, useState } from 'react'

import { Sidebar } from './Sidebar'
import Icon from '../../assets/horizon.svg?react';


interface TopBarProps {
  onLoginClick: () => void;
}

export const Topbar: React.FC<TopBarProps>  = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen)


    // Testing Go Backend - Smoke Check
    // Print status: ok
    useEffect(() => {
    fetch("http://localhost:8080/health")
      .then(res => res.json())
      .then(console.log);
  }, [])


  return (
    <>
      <nav className='w-full h-18 px-4 lg:px-8 flex items-center justify-between border-b border-gray-700'>
          <div className="flex gap-4 justify-center flex-1">
            
            <Icon className="w-8 h-8 text-green-700" />
            <span className='font-semibold text-lg text-gray-300'>
              NorthBeam Horizon
            </span>
          </div>

        <div>
          <button 
            className='px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors'
            onClick={onLoginClick}>
              Login
          </button>
        </div>

      </nav>

      <Sidebar isOpen={isOpen} onToggle={handleToggle} />
    </>
  );
};