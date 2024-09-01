import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import Loading from "./Loading";
import  baseUrl  from "../baseUrl/baseUrl";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const  {data : authUser} = useQuery({queryKey:["authUser"]})
 const queryClient = useQueryClient()

  const {mutate : logout , isPending  } = useMutation({
    mutationFn : async () =>{
      try{
        const res = await fetch(`${baseUrl}/auth/logout`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!res.ok){
          throw new Error('Network response was not ok')
        }
        return res.json()
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess : (data) =>{
      toast.success(data.message)
      queryClient.invalidateQueries({querykey :['authUser']})
    },
  })

  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm lg:btn-md lg:hidden"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow  "
              >
                <li className="rounded-md  hover:bg-green-400 hover:text-white">
                  <Link to="/course">Fullstack Course</Link>
                </li>
                <li className="rounded-md  hover:bg-green-400 hover:text-white">
                  <Link to="/complier">JavaScript Complier</Link>
                </li>
                <li className="rounded-md  hover:bg-green-400 hover:text-white">
                  <Link>Fullstack Roadmap</Link>
                </li>
                {authUser?.role !== "user" && authUser && (
              <li className="rounded-md  hover:bg-green-400 hover:text-white">
              <Link to="/admin">Admin</Link>
            </li>
            )}
              
              </ul>
            )}
          </div>
          <Link to="/" className="btn btn-ghost btn-sm lg:btn-md text-sm lg:text-xl rounded-md  hover:bg-green-400 hover:text-white">Education</Link>
        </div>
        <div className="navbar-center hidden  lg:flex  ">
          <ul className="menu menu-horizontal text-md  ">
            <li className="rounded-md  hover:bg-green-400 hover:text-white">
                <Link to="/course">Fullstack Course</Link>
            </li>
            <li className="rounded-md  hover:bg-green-400 hover:text-white">
              <Link to="/complier">JavaScript Complier</Link>
            </li>
            <li className="rounded-md  hover:bg-green-400 hover:text-white">
              <Link>Fullstack Roadmap</Link>
            </li>
            {authUser?.role !== "user" && authUser && (
              <li className="rounded-md  hover:bg-green-400 hover:text-white">
              <Link to="/admin">Admin</Link>
            </li>
            )}
           
          </ul>
        </div>
        <div className="navbar-end mr-2">
            <p  className="mr-3 text-xs lg:text-sm  p-1 uppercase cursor-default rounded btn-outline bg-green-50 text-green-500 hover:bg-green-400 hover:text-white">Free</p>
          {authUser ? (
            <button onClick={logout} className="btn btn-sm w-14 lg:w-20 lg:h-10 lg:text-sm text-xs h-8 uppercase rounded btn-outline bg-green-50 text-green-500 hover:bg-green-400 hover:text-white">{isPending ? <Loading/> : "Logout"} </button>
          ): (<Link to="/login" className="btn btn-sm w-14 lg:w-20 lg:h-10 lg:text-sm text-xs h-8 uppercase rounded btn-outline bg-green-50 text-green-500 hover:bg-green-400 hover:text-white">Login</Link>)}
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
