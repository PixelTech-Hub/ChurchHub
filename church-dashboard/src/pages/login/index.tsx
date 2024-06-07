import Input from "@/components/forms/Input"
import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<div className="relative bg-image">
			<div className="border border-[#49d205] absolute lg:top-[20rem] h-[27rem] md:top-[25rem] top-[10rem] lg:left-[40rem] md:left-[8rem] left-[1rem] lg:right-[40rem] md:right-[8rem] right-[1rem]  bg-white rounded-lg  pt-10 pb-10 ">
				<div className="font-extrabold flex flex-col items-center justify-center">
					<h1 className="lg:text-3xl text-xl"> CHURCHPRO </h1>
					<h1 className="lg:text-xl text-sm"> ADMIN LOGIN </h1>

				</div>
				<div className="h-[2px] w-auto px-0 bg-gray-500 mt-4" />
				<form className="flex flex-col space-y-3 m-2 mt-8 p-2 ">
					<div>
						<Input value={email} setValue={setEmail} label="Email" type="text" placeholder="" />
					</div>
					<div>
						<Input value={password} setValue={setPassword} label="Password" type="password" placeholder="" />
					</div>
					<div className="flex flex-row items-center justify-between mb-4">
						<Link to='/forgot-password' className="cursor-pointer text-red-500 lg:text-[16px] text-[12px]">Forgot password?</Link>
						<Link to='/terms-and-conditions' className="cursor-pointer  text-[#49d205] lg:text-[16px] text-[12px]">Terms of Condition</Link>
					</div>
					<div className=" bg-[#49d205] p-2 flex items-center justify-center rounded-lg ">
						<button className="uppercase font-semibold lg:text-base text-sm">login</button>
					</div>
				</form>
			</div>
			<div className="absolute lg:bottom-4 bottom-2 left-0 right-0 flex items-center justify-center  lg:px-4 px-2 font-bold lg:text-xl md:text-lg text-sm text-white ">
				<p className="">Designed by PixelTech 2024</p>
			</div>
		</div>
	)
}

export default Login