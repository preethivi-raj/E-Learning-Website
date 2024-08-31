import React from 'react'
import { Link } from 'react-router-dom'
import home from '../../assests/home.png'

const HomePage = () => {

    const  year = new Date().getFullYear()
  return (
   <div>
    <section className="bg-gradient-to-l from-white to-green-300 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl font-bold">Learn the MERN Stack for Free</h2>
                <p className="mt-4 text-lg text-gray-800">Master MongoDB, Express.js, React.js, and Node.js with our comprehensive and hands-on course.</p>
                <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700">
                    <Link to="/course">Get Started</Link>   
                </button>
            </div>
           
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <img src={home} alt="MERN Stack Learning" className="rounded-lg w-3/4 md:w-2/3 h-auto"/>
            </div>
        </div>
    </section>

   
    <section className="py-16 bg-gradient-to-l from-white to-green-300 text-white ">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-gray-800">Why Learn MERN Stack?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h4 className="text-xl font-semibold text-green-400">Full-Stack Mastery</h4>
                    <p className="mt-4 text-gray-600">Learn to build complete web applications from scratch using the MERN stack.</p>
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h4 className="text-xl font-semibold text-green-400">Job-Ready Skills</h4>
                    <p className="mt-4 text-gray-600">Gain the skills required by the industry, from frontend to backend development.</p>
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h4 className="text-xl font-semibold text-green-400">Hands-On Projects</h4>
                    <p className="mt-4 text-gray-600">Work on real-world projects that showcase your skills to potential employers.</p>
                </div>
            </div>
        </div>
    </section>

  
    <section className="bg-gradient-to-l from-white to-green-300 text-gray  py-20">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold">Start Learning Today!</h3>
            <p className="mt-4 text-lg">Sign up now and take your first step towards becoming a MERN stack developer.</p>
            <button className="mt-6 bg-green-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-500">
                <Link to="/signup">Join Now</Link>
            </button>
        </div>
    </section>

    <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; {year} MERN Stack Course. All rights reserved.</p>
        </div>
    </footer>
   </div>
  )
}

export default HomePage