import { useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { CiLight, CiSettings } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoNotificationsOutline } from "react-icons/io5";



interface TopBarProps {
	openSideBar: boolean;
	setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}


const TopBar: React.FC<TopBarProps> = ({ openSideBar, setSidebar }) => {
	const [toggle, setToggle] = useState(true)
	const { setTheme } = useTheme()


	return (
		<div className={`flex items-center justify-between    bg-[#00283a] px-4 lg:h-16 h-20 text-white`}>
			<div className={` ${!openSideBar && 'flex-1'} flex items-center gap-5`}>
				{openSideBar ? (
					<HiMiniSquares2X2
						size={35}
						onClick={() => setSidebar(!openSideBar)}
						className="cursor-pointer"
					/>
				) : (
					<AiOutlineArrowRight
						size={35}
						onClick={() => setSidebar(!openSideBar)}
						className="cursor-pointer"
					/>
				)}
				<p className="hidden lg:flex font-bold text-2xl">Dashboard</p>
			</div>
			<div className="flex items-center gap-2">
				<div className="bg-[#00496d] p-3 rounded-lg cursor-pointer" onClick={() => setToggle(!toggle)}>
					{toggle ? (
						<MdDarkMode
							className=" lg:w-6 w-4 lg:h-6 h-4"
							color="white"
							onClick={() => setTheme("dark")}
						/>
					) : (
						<CiLight
							className=" lg:w-6 w-4 lg:h-6 h-4"
							color="white"
							onClick={() => setTheme("light")}
						/>
					)}

				</div>
				<div className="bg-[#00496d] p-3 rounded-lg cursor-pointer">
					{/* <Message /> */}
					Mssg
				</div>
				<div className="bg-[#00496d] p-3 rounded-lg cursor-pointer">
					<Popover>
						<PopoverTrigger>
							<IoNotificationsOutline
								color="white"
								className="  w-4  h-4"
							/>
						</PopoverTrigger>
						<PopoverContent>
							{/* <Notification /> */}
							Not
						</PopoverContent>
					</Popover>
				</div>
				<div className="hidden lg:flex bg-[#00496d] p-3 rounded-lg cursor-pointer">
					<Popover>
						<PopoverTrigger>
							<CiSettings
								className=" lg:w-6 w-4 lg:h-6 h-4"
								color="white"
							/>
						</PopoverTrigger>
						<PopoverContent>
							{/* <Settings /> */}
							set
						</PopoverContent>
					</Popover>
				</div>
				<div className="bg-[#00496d] lg:p-3 md:p-2 p-1 rounded-lg cursor-pointer">

					{/* <UserProfile /> */}
					User
				</div>
			</div>
		</div>
	);
}
export default TopBar