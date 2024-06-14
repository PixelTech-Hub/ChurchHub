
interface AuthProps {
	children: any
}

const AuthWrapper = ({ children }: AuthProps) => {
	return (
		<div className="relative bg-image">
			<div className="absolute border-8 border-white bg-white lg:top-[5rem] md:top-[20rem] top-[5rem] lg:left-[10rem] md:left-[10rem] left-[1rem] lg:right-[10rem] md:right-[10rem] right-[1rem]  lg:bottom-[5rem] z-10 rounded-lg   flex flex-row">
				<div className="hidden lg:flex flex-col bg-gradient-to-b from-orange-500 to-slate-100 w-1/2 rounded-3xl p-2 m-10 text-white ">
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
					{children}
				</div>
			</div>
			<div className="absolute lg:bottom-4 bottom-2 left-0 right-0 flex items-center justify-center  lg:px-4 px-2  lg:text-[14px] md:text-lg text-sm text-white ">
				<p className="">Designed by PixelTech 2024</p>
			</div>
		</div>
	)
}

export default AuthWrapper