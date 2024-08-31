// CourseCard.js
import React from 'react';

const CourseCard = ({ course  }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={course.img} alt={course.title} className="w-full h-48 object-cover"/>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-justify">{course.description.substring(0,70)}{"...."}</p>
                <p className="text-gray-600 mb-4"> <span className='font-semibold'>Instructor</span>: {course.instructor}</p>
                <a href={`/course/${course._id}`} className="block bg-green-500 hover:bg-green-400 text-white font-semibold text-center rounded-lg px-4 py-2">View Course</a>
            </div>
        </div>
    );
};

export default CourseCard;
