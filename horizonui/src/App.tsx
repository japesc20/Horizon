import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import { Topbar } from './Components/Layout/Topbar'
import { Dashboard } from './Pages/Dashboard';
import { LoginModal } from './Components/ui/LoginModal'
import { Footer } from './Components/Layout/Footer';
import { Analytics } from './Pages/Analytics';
import { Portfolio } from './Pages/Portfolio';
import { Recession } from './Pages/Recession';
import { Settings } from './Pages/Settings';
import { RegisterModal } from './Components/ui/RegisterModal';



function App() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  return (
      <div className='min-h-screen flex flex-col'>
        
        {/* Topbar */}
        <Topbar onLoginClick={() => setIsLoginOpen(true)} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
          {/* <Dashboard /> */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/recession" element={<Recession />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        
        </main>

        {/* Footer */}
        <Footer></Footer>

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)}
          onRegisterClick={openRegister}
          />
        
        <RegisterModal 
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={openLogin}
          />
      </div>
  )
}

export default App
 