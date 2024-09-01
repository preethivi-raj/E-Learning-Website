import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import CoursePage from "./CoursesPage";
import baseUrl from "../../baseUrl/baseUrl";
import Loading from "../../Components/Loading";

const AdminPage = () => {
  const [courses, setCourses , isPending] = useState([]);

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
  },[getAllCourses]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="mb-6 flex justify-center gap-4">
          <Link
            to="/admin/course/create"
            className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 transition duration-200"
          >
            Create New Course
          </Link>
        </div>
        {isPending ? <Loading/> : <CoursePage courses={courses} />  }
      </div>
    </div>
  );
};

export default AdminPage;
