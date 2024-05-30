import { AiOutlineDelete, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

interface TableProps {
	rows: {
		[key: string]: string; // Each row is an object with string keys and string values
	}[];
	headers: string[],
	link?: string
}

const Table = ({ headers, rows, link }: TableProps) => {
	console.log('rows....', rows)
	return (
		<div className="bg-white shadow-gray-400 rounded-lg mb-4  p-6 h-full shadow-lg">
			<div className="flex items-center justify-between mb-4">
				<p></p>
				<input type="search" name="" id="" className="bg-gray-300 w-full rounded-lg p-2 px-2 outline-[#200e32]" placeholder="Church Branch Name" />
			</div>
			<div className="flow-root overflow-y-auto h-[600px] scroll-my-20">
				<ul role="list" className="divide-y divide-gray-400">
					<li className="py-3 sm:py-4 font-bold ">
						<div className="flex items-center space-x-2">
							{headers.map((header, index) => (
								<div className="flex-1 min-w-0" key={index}>
									<p className="lg:text-sm text-[10px] truncate">{header}</p>
								</div>
							))}
							<div className="flex-1 min-w-0" >
								<p className="lg:text-sm text-[10px] truncate">ACTION</p>
							</div>

						</div>
					</li>
					{rows.map((row, rowIndex) => {
						console.log('....row...', row)
						return (
							<li className="py-2 cursor-pointer hover:bg-gray-300 hover:px-2" key={rowIndex}>
								<div className="flex items-center space-x-4">
									{Object.values(row).map((value, colIndex) => (
										<div className="flex-1 min-w-0" key={colIndex}>
											<p className="lg:text-sm text-[10px] text-gray-500 truncate">{value}</p>
										</div>
									))}
									<div className="flex-1 flex flex-row min-w-0 gap-4" >
										<Link to={`/app/${link}/${row.id}`} className="bg-green-500 p-2.5 rounded-md">
											<AiOutlineRight color="white" size={20} />
										</Link>
										<button className="bg-red-500 p-2.5 rounded-md">
											<AiOutlineDelete size={20} color="white" />
										</button>
									</div>
								</div>
							</li>
						)
					})}


				</ul>
				<div className="absolute bottom-10 right-10 left-10">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p>Page 1 of 2</p>
						</div>
						<div className="space-x-4">
							<button className="bg-[#200e32] text-white rounded-lg px-2 p-2">Previous</button>
							<button className="bg-[#200e32] text-white rounded-lg px-2 p-2">Next</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Table