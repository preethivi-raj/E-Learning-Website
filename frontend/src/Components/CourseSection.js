
import React from 'react';
import CourseCard from './CourseCard';

const CoursesSection = ({ courses }) => {
    return (
        <section className="mt-3">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 hover:text-green-500 text-center mb-8">Our Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {courses.map((course) => (
                        <CourseCard 
                            key={course._id} 
                            course={course}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
