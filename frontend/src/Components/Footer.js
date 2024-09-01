import React from 'react'

const Footer = () => {
    const  year = new Date().getFullYear()
  return (
    <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; {year} MERN Stack Course. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer