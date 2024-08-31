import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Complier from './Pages/Complier/Complier'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage/HomePage'
import CoursePage from './Pages/Course/CoursePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import Loading from './Components/Loading'
import { Navigate } from 'react-router-dom'
import IndividualCoursePage from './Pages/Course/IndividualCoursePage'
import AdminPage from './Pages/Admin/AdminPage'
import CreateCourse from './Pages/Admin/CreateCourse'
import CreateNotes from './Pages/Admin/CreateNotes'
import baseUrl from './baseUrl/baseUrl'

const App = () => {
    
  const {data : authUser , isLoading}= useQuery({
    queryKey : ['authUser'],
    queryFn : async()=>{
      try {
        const res = await fetch(`${baseUrl}/auth/me`,{
           credentials: 'include',
        })
        const data = await res.json()
        if(data.error){
          return null;
        }
        if(!res.ok){
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    retry : false,
  })

  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage /> } />
        <Route path='/course' element={authUser ?<CoursePage />: <Navigate to="/login"/>} />
        <Route path='/course/:id' element={authUser ?<IndividualCoursePage />: <Navigate to="/login"/>} />
        <Route path='/admin' element={authUser ?<AdminPage />: <Navigate to="/"/>} />
        <Route path='/login' element={!authUser ?<Login />: <Navigate to="/"/>} />
        <Route path='/signup' element={!authUser ?<Signup />: <Navigate to="/"/>} />
        <Route path='complier' element={authUser ?<Complier />: <Navigate to="/login"/>} />
        <Route path="/admin/course/create" element={authUser ?<CreateCourse  />: <Navigate to="/"/>} />
        <Route path="/admin/notes/create/:id" element={authUser ?<CreateNotes />: <Navigate to="/"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App