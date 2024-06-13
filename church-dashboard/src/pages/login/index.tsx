import Input from "@/components/forms/Input"
import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {
	const [email, setEmail] = useState(" ")
	const [password, setPassword] = useState(" ")

	return (
		<div className="relative bg-image">
			<div className="absolute border-8 border-white bg-white lg:top-[5rem] md:top-[20rem] top-[10rem] lg:left-[10rem] md:left-[10rem] left-[1rem] lg:right-[10rem] md:right-[10rem] right-[1rem]  lg:bottom-[5rem] z-10 rounded-lg   flex flex-row">
				<div className="hidden lg:flex flex-col bg-orange-500 w-1/2 rounded-3xl p-2 m-10 text-white ">
					<div className="pt-16 px-10 text-3xl font-bold space-y-1">
						<p className=" ">Simplify</p>
						<p>management with</p>
						<p>our dashboard.</p>
					</div>
					<div className="text-lg px-10 pt-16">
						<p>Simplify your church management with our user-friendly admin dashboard.</p>
					</div>
				</div>
				<div className=" lg:w-1/2 w-full  rounded-r-lg p-2 lg:m-28 m-0">
					<div className=" flex flex-col items-center justify-center lg:py-6 md:py-4 py-2">
						<h1 className="font-bold text-2xl">CHURCH-HUB</h1>
						<p className="lg:pt-24 md:pt-10 pt-2  lg:text-xl md:text-xl text-lg font-bold">Welcome Back</p>
						<p className="lg:text-sm md:text-sm text-[12px] text-gray-500">Please login to your account</p>
					</div>
					<form className="lg:mx-10 md:mx-8 mx-2 space-y-5">
						<Input placeholder="" value={email} setValue={setEmail} label="Email" type="email" />
						<Input placeholder=" " value={password} setValue={setPassword} label="Password" type="password" />
						<div className="flex items-end justify-end text-orange-500 ">
							<p className="lg:text-base md:text-base text-sm">Forgot Password?</p>
						</div>
						<div className="bg-orange-500  p-2 flex text-white lg:text-lg text-sm rounded-xl items-center justify-center">
							<button type="submit" className="">Login</button>
						</div>
					</form>
				</div>
			</div>
			<div className="absolute lg:bottom-4 bottom-2 left-0 right-0 flex items-center justify-center  lg:px-4 px-2 font-bold lg:text-xl md:text-lg text-sm text-white ">
				<p className="">Designed by PixelTech 2024</p>
			</div>
		</div>
	)
}

export default Login