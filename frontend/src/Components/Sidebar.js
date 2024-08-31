// Sidebar.js
import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import baseUrl from '../baseUrl/baseUrl';


const Sidebar = () => {

    const [courses, setCourses] = useState([]);

    const { mutate: getAllCourses } = useMutation({
        mutationFn: async () => {
          try {
            const res = await fetch(`${baseUrl}/course`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await res.json();
            return data;
          } catch (error) {
            throw new Error(error);
          }
        },
        onSuccess: (data) => {
          setCourses(data);
          
        },
      });

      useEffect(() => {
        getAllCourses();
      }, [getAllCourses]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-green-500">Courses</h2>
            <ul className="space-y-2">
                {courses.map(course => (
                    <li key={course._id} className=' bg-green-400 rounded-md p-2 hover:text-white '>
                        <a
                            href={`/course/${course._id}`}
                            
                        >
                            {course.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
