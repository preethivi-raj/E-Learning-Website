import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";


import loginLogo from "../../assests/login.png";
import { useMutation , useQueryClient} from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import baseUrl from "../../baseUrl/baseUrl";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const queryClient = useQueryClient()
  const{mutate : login , isError , isPending , error}=useMutation({
		mutationFn :  async({email , password})=>{
			try {
				const res = await fetch(`${baseUrl}/auth/login`,{
					method : 'POST',
					credentials: 'include',
					headers : {
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify({email , password})
				})
       
				const data = await res.json()
				if(!res.ok){
					throw new Error(data.error || 'User name or password is incorrect')
				}
				return data
			} catch (error) {
				throw new Error(error.message)  
			}
		},
		onSuccess : ()=>{
			toast.success('Login Success')
			queryClient.invalidateQueries({querykey :['authUser']})
		}
	})

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="lg:flex lg:mx-44 lg:items-center lg:-m-20">
      <div className="flex  justify-center items-center">
        <img
          src={loginLogo}
          alt="login"
          className=" w-56 h-56 lg:w-full lg:h-screen "
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center lg:-ml-20 ">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-extrabold text-center text-green-400">
            Sign In
          </h1>
          <label className="input  input-success  rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>

          <label className="input  input-success  rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn uppercase rounded-full btn-outline bg-green-50 text-green-500 hover:bg-green-400 hover:text-white">
           {isPending ? <Loading/> : 'Login'}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className=" text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <p className=" flex justify-center  hover:underline ">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
