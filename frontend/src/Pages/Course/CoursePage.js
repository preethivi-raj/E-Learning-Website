import React, { useEffect, useState } from 'react'
import CoursesSection from '../../Components/CourseSection'
import { useMutation } from '@tanstack/react-query'
import baseUrl from '../../baseUrl/baseUrl'

const CoursePage = () => {
    
    const  [courses, setCourses] = useState([])
    
     const {mutate:getAllCourses} = useMutation({
      
      mutationFn : async () =>{
        try{
            const res = await fetch(`${baseUrl}/course`,{
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            if(!res.ok){
              throw new Error('Network response was not ok')
            }
            const data = await res.json()
            return data
        } catch (error) {
          throw new Error(error)
        }
      },
      onSuccess : (data) =>{
        setCourses(data)
      },
     })

     useEffect(()=>{
      getAllCourses()
     },[getAllCourses])

  return (
    <div>
        <div className='mb-3'>
            <CoursesSection courses={courses} />
        </div>
    </div>
  )
}

export default CoursePage