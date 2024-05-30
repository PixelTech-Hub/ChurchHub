
import { Link } from 'react-router-dom'

const Transaction = () => {
	return (
		<div className="bg-white shadow-gray-400 rounded-lg mb-4  p-6 h-full shadow-lg">
			<div className="flex items-center justify-between mb-4">
				<h3 className="lg:text-xl text-[14px] font-bold leading-none text-gray-900">
					Transactions
				</h3>
				<Link
					to="/transactions"
					className="lg:text-base text-[13px] font-extrabold text-[#8d220a] hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
				>
					View all
				</Link>
			</div>
			<div className="flow-root overflow-y-auto h-[530px] scroll-my-20">
				<ul role="list" className="divide-y divide-gray-400">
					<li className="py-3 sm:py-4 font-bold ">
						<div className="flex items-center space-x-2">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]   truncate">
									Receipt Id
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]   truncate">
									Name
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  truncate">
									Amount
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] ">
								Received
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>
					<li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-300 hover:px-2">
						<div className="flex items-center space-x-4">
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									#22435465
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									Generator Purcase
								</p>
							</div>
							<div className="flex-1 min-w-0">
								<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
									UGX 12,000,000
								</p>
							</div>
							<div className="inline-flex items-center lg:text-base text-[10px] text-gray-500">
								Okello Simon
							</div>
						</div>
					</li>




				</ul>
			</div>
		</div>
	)
}

export default Transaction