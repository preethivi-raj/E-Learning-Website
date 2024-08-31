import React from 'react'
import { Link } from 'react-router-dom'
const CoursesPage = ({courses}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 hover:text-green-500">All Courses</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-700 mb-4">
              {course.description.substring(0, 75)}
              {"...."}
            </p>
            <Link
              to={`/admin/notes/create/${course._id}`}
              className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 transition duration-200"
            >
              Create New Note
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No courses available.</p>
      )}
    </div>
  </div>
  )
}

export default CoursesPage