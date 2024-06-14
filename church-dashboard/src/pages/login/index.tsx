import AuthWrapper from "@/components/auth/AuthWrapper"
import Input from "@/components/forms/Input"
import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<AuthWrapper>
			<div className=" flex flex-col items-center justify-center lg:py-6 md:py-4 py-2">
				<h1 className="font-bold text-2xl">CHURCH-HUB</h1>
				<div className="w-36 h-36 bg-orange-500 rounded-xl mt-4"></div>
				<p className="lg:pt-10 md:pt-8 pt-2  lg:text-xl md:text-xl text-lg font-bold">Welcome Back</p>
				<p className="lg:text-sm md:text-sm text-[12px] text-gray-500">Please login to your account</p>
			</div>
			<form className="lg:mx-10 md:mx-8 mx-2 space-y-5">
				<Input value={email} setValue={setEmail} label="Email" type="email" />
				<Input value={password} setValue={setPassword} label="Password" type="password" />
				<div className="flex items-end justify-end text-orange-500 ">
					<Link to="/forgot-password" className="lg:text-base md:text-base text-sm cursor-pointer">Forgot Password?</Link>
				</div>
				<div className="bg-orange-500  p-2 flex text-white lg:text-lg text-sm rounded-xl items-center justify-center">
					<button type="submit" className="">Login</button>
				</div>
			</form>
		</AuthWrapper>
	)
}

export default Login