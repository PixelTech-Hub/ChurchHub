import ProfileImg from '@/assets/images/icons/user.png'
import { DashboardLinks } from '@/data/data'
import { NavLink, useLocation } from 'react-router-dom'

const LeftSideBar = () => {
	const { pathname } = useLocation()
	return (
		<section className='relative h-full overflow-y-auto'>
			<div className='flex flex-col items-center justify-center pt-4 text-white font-bold lg:text-[16px] text-[14px] px-1'>
				<img src={ProfileImg} alt="" className='lg:w-32 w-20 bg-white rounded-full' />
				<p>OKUMU DANIEL COMBONI</p>
				<p className='font-normal lg:text-[14px] text-[12px]'>okumucomboni@gmail.com</p>
			</div>
			<hr className='lg:mt-4 mt-2' />
			<main className='lg:mt-10 mt-4 text-white lg:text-[14px] text-[10px] uppercase lg:space-y-1 space-y-1'>
				{DashboardLinks?.map(item => (
					<NavLink
						key={item.name + item.path}
						to={item.path}
						// className="flex items-center gap-2  hover:text-[#00283A] font-semibold px-4 bg-[#00283A] p-4  hover:bg-white "
						className={
							pathname === item.path ? 'flex items-center gap-2 cursor-pointer  text-[#00283A] font-bold px-4 lg:p-4 p-3  bg-gray-300' : 'flex items-center gap-2  hover:text-[#00283A] font-semibold px-4 bg-[#8d220a] lg:p-4 p-3  hover:bg-gray-300 cursor-pointer'
						}

					>
						<p>{item.name}</p>
					</NavLink>
				))}



			</main>
			{/* <button className=" text-white mt-4 bg-green-500 flex w-full items-center text-center justify-center p-2 font-bold text-lg">LOGIN</button> */}
		</section>
	)
}

export default LeftSideBar