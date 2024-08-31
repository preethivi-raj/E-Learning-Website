import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading";
import baseUrl from "../../baseUrl/baseUrl";

const CreateCourse = () => {

    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [description, setDescription] = useState("")
    const [instructor, setInstructor] = useState("")
    const [link, setLink] = useState("")

    const imgRef = useRef(null);

    const {mutate:createCourse,isPending} = useMutation({
      mutationFn: async (newCourse) => {
        try {
          const res = await fetch(`${baseUrl}/course/create`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
          });
          if(!res.ok){
            throw new Error("Network response was not ok");
          }
          const data = await res.json();
          return data;
        } catch (error) {
          throw new Error(error);
        }
      },
      onSuccess: () => {
        toast.success("Course created successfully");
        setTitle("");
        setImg("");
        setDescription("");
        setInstructor("");
        setLink("");
        imgRef.current.value = "";
      },
      onError: (error) => {
        toast.error("An error occurred. Please try again.");
      }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = {
          title,
          img,
          description,
          instructor,
          link
        }
        createCourse(newCourse)
    }


  
    const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

  return (
    <div className="min-h-screen bg-gradient-to-t from-white to-green-300 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg m-3 p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 hover:text-green-500">Create a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="instructor">
              Instructor Name
            </label>
            <input
              type="text"
              name="instructor"
              id="instructor"
              value={instructor}
              onChange={(e)=>setInstructor(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="img">
              Image
            </label>
            <input
              type="file"
              name="img"
              ref={imgRef}
              accept="image/*"
              onChange={handleImgChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="link">
              Course Link
            </label>
            <input
              type="text"
              name="link"
              id="link"
              value={link}
              onChange={(e)=>setLink(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-green-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 transition duration-200"
          >
            {isPending ? <Loading/> : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
