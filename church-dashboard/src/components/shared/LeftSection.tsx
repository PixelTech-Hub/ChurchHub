import { ReactElement } from "react"
import Header from "./Header"
import LeftSideBar from "./LeftSideBar"

interface Props {
	showSideBar?: boolean

}

const LeftSection = ({ showSideBar }: Props): ReactElement => {
	return (
		<div className={` ${showSideBar ? 'bg-[#200e32] h-screen lg:w-[250px] md:w-[200px] w-full ' : 'hidden'} `}>
			<Header />
			<LeftSideBar />
		</div>
	)
}

export default LeftSection