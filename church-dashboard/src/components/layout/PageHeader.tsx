interface HeaderProps {
	title: string;
	children: any;
}

const PageHeader = ({ children, title }: HeaderProps) => {
	return (
		<div className="flex  flex-1 items-center justify-between gap-4 m-4 lg:px-2 px-2   lg:p-2 p-1 rounded-md bg-white ">
			<div className="flex items-center  tracking-wider font-bold lg:text-xl text-[10px] ">
				{title}
			</div>
			<div className="px-1">
				{children}
			</div>
		</div>
	)
}

export default PageHeader