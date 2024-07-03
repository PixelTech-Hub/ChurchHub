import AuthWrapper from "@/components/auth/AuthWrapper"
import Input from "@/components/forms/Input"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '@/assets/svg/logo.svg'


const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<AuthWrapper>
			<div className=" flex flex-col items-center justify-center ">
				<img src={logo} alt="logo" className="w-[15rem]"/>
				<p className=" lg:text-xl md:text-xl text-lg font-bold">Welcome Back</p>
				<p className="lg:text-sm md:text-sm text-[12px] text-gray-500">Please login to your account</p>
			</div>
			<form className="lg:mx-10 md:mx-8 mx-2 space-y-5">
				<Input value={email} setValue={setEmail} label="Email" type="email" />
				<Input value={password} setValue={setPassword} label="Password" type="password" />
				<div className="flex items-end justify-end text-[#ff8036] ">
					<Link to="/forgot-password" className="lg:text-base md:text-base text-sm cursor-pointer">Forgot Password?</Link>
				</div>
				<div className="bg-[#ff8036]  p-2 flex text-white lg:text-lg text-sm rounded-xl items-center justify-center">
					<button type="submit" className="">Login</button>
				</div>
			</form>
		</AuthWrapper>
	)
}

export default Login