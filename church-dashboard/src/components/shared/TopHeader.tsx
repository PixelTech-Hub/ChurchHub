import menuIcon from '@/assets/svg/menu.svg'
import { ReactElement } from 'react'
import ProfileImg from '@/assets/images/icons/user.png'


interface Props {
	setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
	showSideBar?: boolean

}
const TopHeader = ({ showSideBar, setShowSideBar }: Props): ReactElement => {

	// console.log('topbar showSideBar:', showSideBar); // Check if showSideBar is correctly passed
	// console.log('topbar setShowSideBar:', setShowSideBar); // Ch

	return (
		<section className={`bg-[#00283A] text-white h-[70px] ${!showSideBar ? 'px-2' : 'px-1'} flex items-center justify-between lg:text-2xl md:text-xl text-sm`}>
			<div className='flex items-center font-bold lg:gap-4 md:gap-2 gap-1 '>
				<img src={menuIcon} alt="" className='lg:w-6 md:w-6 w-4 cursor-pointer' onClick={() => setShowSideBar(!showSideBar)} />
				<p className={`${showSideBar && 'hidden lg:flex'}`}>DASHBOARD</p>
			</div>
			<div className={`${!showSideBar ? '' : 'hidden lg:flex'}`}>
				<div>
					<img src={ProfileImg} alt="" className='lg:w-12 w-8 lg:h-12 h-8 rounded-full bg-white p-0.5'/>
				</div>
			</div>
			
		</section>
	)
}

export default TopHeader