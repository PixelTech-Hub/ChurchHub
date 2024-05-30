import logo from '@/assets/logo/pixel tech.png'

const Login = () => {
	return (
		<main className="grid md:grid-cols-2 grid-cols-1 h-screen w-full">
			<div className="hidden lg:flex flex-col justify-center w-1/2">
			</div>
			<div className="bg-[#081A51]  flex flex-col items-center justify-center ">
				<form
					className="max-w-[500px] lg:h-auto h-screen w-full mx-auto bg-gray-900 p-8  px-8 rounded-lg"

				>
					<div className="flex flex-col items-center">
						<img
							src={logo}
							alt=""
							className="w-[150px]  flex items-center justify-center rounded-md"
						/>
						<h2 className="mt-3 text-4xl text-white font-bold text-center">ADMIN LOGIN</h2>
					</div>
					<div className="flex flex-col text-xl font-medium text-gray-400 py-2">
						<label htmlFor="user">Username</label>
						<input
							type="text"
							className="p-2 outline-none rounded-sm"
							id="text"
							name="user"
							autoComplete="off"
							autoFocus
						/>
					</div>
					{/* password */}
					<div className="flex flex-col text-xl font-medium text-gray-400 py-2">
						<label htmlFor="pwd">Password</label>
						<input
							type="password"
							className="p-2 outline-none rounded-sm"
							// required

							name="pwd"
							id="pwd"

						/>
					</div>
					<div className="flex justify-between text-gray-400 py-2">
						<p className="flex items-center">
							<input
								type="checkbox"
								id="persist"
							/>
							Remember Me
						</p>
						<p>Forgot Password </p>
					</div>
					<button type="submit" className="uppercase w-full bg-[#081A51] shadow-lg shadow-[#081A51]  rounded px-4 text-white py-2 text-xl my-5">
						Login
					</button>
				</form>
			</div>
		</main>
	)
}

export default Login