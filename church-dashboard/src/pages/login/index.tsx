import Input from "@/components/forms/Input"
import { useState } from "react"


const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<div className="relative bg-image">
			<div className="absolute lg:top-[20rem] md:top-[25rem] top-[10rem] lg:left-[40rem] md:left-[8rem] left-[1rem] lg:right-[40rem] md:right-[8rem] right-[1rem]  bg-white rounded-lg p-4 pt-10 pb-10 ">
				<div className="font-bold lg:text-xl text-lg flex items-center justify-center">
					<h1>CHURCHPRO LOGIN </h1>
				</div>
				<form className="flex flex-col space-y-3 m-2">
					<div>
						<Input value={email} setValue={setEmail} label="Email" type="text" placeholder="admin@church.org" />
					</div>
					<div>
						<Input value={password} setValue={setPassword} label="Password" type="text" placeholder="admin@church.org" />
					</div>
					<div className="flex flex-row items-center justify-between ">
						<p className="cursor-pointer text-red-500 lg:text-[16px] text-[12px]">Forgot password?</p>
						<p className="cursor-pointer lg:text-[16px] text-[12px]">Terms of Condition</p>
					</div>
					<div className="bg-green-500 p-2 flex items-center justify-center rounded-lg ">
						<button className="uppercase font-semibold lg:text-base text-sm">login</button>
					</div>
				</form>
			</div>
			<div className="absolute lg:bottom-4 bottom-2 left-0 right-0 flex items-center justify-center  lg:px-4 px-2 font-bold lg:text-xl text-lg lg:text-black text-white ">
				<p className="">Designed by PixelTech 2024</p>
			</div>
		</div>
	)
}

export default Login