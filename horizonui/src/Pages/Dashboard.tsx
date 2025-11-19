import React from 'react'


interface DashboardProps {

}

export const Dashboard:React.FC<DashboardProps> = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-300">Welcome to NorthBeam Horizon</h1>
        <p className="mt-4 text-gray-500">Your content here...</p>
    </>
  )
}
 
