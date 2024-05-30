import { AiOutlineArrowUp } from "react-icons/ai"


const ChurchCard = () => {
	return (
		<div className='mx-4 lg:mt-6 mt-0 grid lg:grid-cols-3 grid-cols-1 gap-4'>
			<div className="bg-gradient-to-br from-[#eecd55] to-[#8d220a] flex items-center bg-white p-8  rounded-lg shadow-lg shadow-gray-400">
				<div className="flex-shrink-0">
					<span className="text-2xl sm:text-3xl leading -none font-bold text-white">
						UGX 2,340
					</span>
					<h3 className="text-base text-gray-900 font-bold">Account Balance</h3>
				</div>
				<div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
					14.6%
					<AiOutlineArrowUp color="green" size={25} />
				</div>
			</div>
			<div className="bg-gradient-to-br from-[#8d220a] to-[#8d220a] flex items-center bg-white p-8  rounded-lg shadow-lg shadow-gray-400">
				<div className="flex-shrink-0">
					<span className="text-2xl sm:text-3xl leading -none font-bold text-white">
						1,340
					</span>
					<h3 className="text-base text-gray-300 font-bold">Church Members</h3>
				</div>
				<div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
					24.6%
					<AiOutlineArrowUp color="green" size={25} />
				</div>
			</div>
			<div className="bg-gradient-to-br from-[#8d220a] to-[#eecd55] flex items-center bg-white p-8  rounded-lg shadow-lg shadow-gray-400">
				<div className="flex-shrink-0">
					<span className="text-2xl sm:text-3xl leading -none font-bold text-white">
						2,340
					</span>
					<h3 className="text-base text-gray-300 font-bold">Church Staff</h3>
				</div>
				<div className="ml-5 w-0 flex items-center justify-end flex-1 text-white text-base font-bold">
					14.6%
					<AiOutlineArrowUp color="white" size={25} />
				</div>
			</div>
		</div>
	)
}

export default ChurchCard