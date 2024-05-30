import { ReactElement } from "react"


interface Props {
	showSideBar?: boolean

}

const Footer = ({showSideBar}: Props): ReactElement => {
  return (
	<div className={`${showSideBar ? 'lg:left-64 left-52 lg:right-4 right-2 ' : 'left-4 right-4'} absolute bottom-4   lg:p-4 p-1 font-bold   bg-white/90 shadow shadow-black  flex flex-1 items-center justify-center `}>
		PIXELTECH CO
	</div>
  )
}

export default Footer