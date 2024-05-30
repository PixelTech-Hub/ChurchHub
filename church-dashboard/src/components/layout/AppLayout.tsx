import { Outlet } from 'react-router-dom'
import LeftSection from '../shared/LeftSection'
import TopHeader from '../shared/TopHeader'
import { useState } from 'react'

const AppLayout = () => {
	const [showSideBar, setShowSideBar] = useState(true);

	return (
		<div className="relative flex flex-1 flex-row h-screen overflow-hidden  z-10 w-full">
			<LeftSection
				showSideBar={showSideBar}
			/>
			<div className='bg-slate-300 h-screen flex-1 w-full'>
				<TopHeader
					showSideBar={showSideBar}
					setShowSideBar={setShowSideBar}
				/>
				<div className="h-full overflow-y-auto"> {/* Added overflow-y-auto and height */}
					<Outlet

					/>
				</div>
			</div>
		</div>
	)
}

export default AppLayout