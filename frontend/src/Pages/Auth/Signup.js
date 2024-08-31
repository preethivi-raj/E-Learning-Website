import { useState } from "react";
import { Link } from "react-router-dom";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";



import singupLogo from "../../assests/signup.png";
import Loading from "../../Components/Loading";
import baseUrl from "../../baseUrl/baseUrl";


const Signup = () => {
	const [formData, setFormData] = useState({
		email: "",
		fullName: "",
		password: "",
	});

  const queryClient = useQueryClient();
	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email,  fullName, password }) => {
			try {
				const res = await fetch(`${baseUrl}/auth/signup`, {
					method: "POST",
					 credentials: 'include',
					headers : { 
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					 },
					body: JSON.stringify({ email,fullName, password }),
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault(); // page won't reload
		mutate(formData);
	};

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className=" lg:flex lg:mx-44 lg:items-center  lg:-m-20">
		<div className=" lg:hidden  flex  justify-center items-center">
            <img src={singupLogo} alt="login" className=" w-56 h-56 lg:w-full  " />
        </div>
        <div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
				<h1 className='text-4xl font-extrabold text-center text-green-400'> Sign Up</h1>
					<label className='input  input-success  rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input  input-success  rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
					<label className='input  input-success  rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn uppercase rounded-full btn-outline bg-green-50 text-green-500 hover:bg-green-400 hover:text-white'>
						{isPending ? <Loading/> : "Sign Up"}
					</button>
					{isError && <p className="text-red-500">{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-center text-lg'>Already have an account?</p>
					<Link to='/login' >
						<p className=" flex justify-center hover:underline ">Login</p>
					</Link>
				</div>
        </div>
        <div className=" hidden lg:block ">
            <img src={singupLogo} alt="login" className=" w-56 h-56 lg:w-full lg:h-screen " />
        </div>
    </div>
  );
};

export default Signup;
