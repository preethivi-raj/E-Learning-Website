import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Comments from "../../Components/Comments";
import NotesSidebar from "../../Components/NoteSidebar";
import Loading from "../../Components/Loading";
import baseUrl from "../../baseUrl/baseUrl";

const IndividualCoursePage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState({});

  const { mutate: getCourse, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/course/${id}`, {
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
      setCourse(data);
      setComments(data.comments);
    },
  });

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  const { mutate: postComment } = useMutation({
    mutationFn: async (text) => {
      try {
        const res = await fetch(`${baseUrl}/course/comment/${id}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(text),
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
      setComments(data.comments);
      setNewComment("");
    },
  })

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postComment({ text: newComment });
  };

  if (!course) {
    return <p className="text-center text-gray-800">Course not found.</p>;
  }

  return (
    <div className="bg-gradient-to-t from-white to-green-300 text-white min-h-screen py-12">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 hidden lg:block">
          <Sidebar  />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/4">
          {/* Course Video */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <iframe
              className="w-full h-96 object-cover"
              src={course.link}
              title="YouTube video player"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Course Details */}
          {isPending ? (
            <div className="text-center">
                <Loading/>
            </div>
          ) :
          (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {course.title}
            </h1>
            <p className="text-gray-600 text-md font-semibold mb-4">{course.instructor}</p>
            <p className="text-gray-600 text-justify">{course.description}</p>
          </div>
          )
        }

          {/* Comment Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-green-500">Comments</h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="4"
                className="w-full outline border-gray-300 text-gray-800 rounded-lg p-2 mb-4"
                placeholder="Add a comment..."
              ></textarea>
              <button
                type="submit"
                className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
               <Comments comments={comments} key={comments._id} courseId={course._id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 hidden lg:block">
            <NotesSidebar course={course} />
        </div>
      </div>
    </div>
  );
};

export default IndividualCoursePage;
