import React from 'react'

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="w-full py-4 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} NorthBeam Horizon
          </div>
        </footer>
    </>
  )
}
