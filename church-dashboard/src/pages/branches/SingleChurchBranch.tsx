import { API_BASE_URL } from "@/app/api";
import { ChurchBranches } from "@/types/ChurchBrances";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import churchImage from '@/assets/images/icons/church.png'
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters, } from "react-icons/ai";
import EditChurchBranch from "@/components/branches/EditChurchBranch";



const SingleChurchBranch = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false)
	const [branches, setBranches] = useState<ChurchBranches>({} as ChurchBranches);



	// const navigate = useNavigate()

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${API_BASE_URL}/church_branches/${id}`)
			.then((response) => {
				setBranches(response.data)
				setLoading(false)
			}
			)
			.catch((error) => {
				console.error(error)
				setLoading(false)
			})
	}, []);

	console.log(id)
	console.log(branches)
	
	return (
		<>
			{loading ? <div className="flex items-center justify-center p-52">

				<AiOutlineLoading3Quarters size={40} />
			</div> : (
				<main className="mt-4 mx-4 mb-24">
					<div className="bg-[#00283A] text-white my-3 p-2 px-4 rounded-lg flex items-center justify-between lg:text-lg text-sm font-bold">
						<Link to="/app/church-branches" className="flex items-center"><AiOutlineArrowLeft size={30} /><p className="hidden lg:flex">Go Back</p></Link>
						<h1 className="uppercase">{branches.name}</h1>
					</div>
					<div className="w-full flex lg:flex-row flex-col items-center gap-4 ">
						<div className="w-full  h-[310px] bg-white p-2 rounded-lg">
							<div className="flex flex-col items-center mb-4">
								<img src={churchImage} alt="" className="w-24 text-center flex items-center" />

							</div>
							<hr className="py-2 w-full px-0" />
							<div className="px-2 lg:text-[16px] text-[14px]">
								<p className="font-bold">Name: <span className="font-normal uppercase truncate px-2">{branches.name}</span></p>
								<p className="font-bold">Date_Launched: <span className="font-normal truncate px-2">{branches?.dob}</span></p>
								<p className="font-bold">Email:
									<span className="font-normal truncate px-2">
										<a target="_blank" href={`mailto:${branches?.email}`}>{branches?.email}</a>
									</span>
								</p>
								<p className="font-bold">Address:
									<span className="font-normal truncate px-2">
										{branches?.location}
									</span>
								</p>
								<p className="font-bold ">Contact:
									<span className="font-normal truncate px-2">
										<a target="_blank" href={`tel:+${branches?.church_number}`}>{branches?.church_number}</a>
									</span>
								</p>
							</div>
							<div className="flex justify-end ">
								<EditChurchBranch
									id={branches?.id ?? ''}
									name={branches.name ?? ''}
									email={branches.email ?? ''}
									dob={branches.dob ?? ''}
									telephone={branches.church_number ?? ''}
									location={branches.location ?? ''}
								/>
							</div>

						</div>

					</div>
					{/* <hr className="mt-4" /> */}
					{/* <div>
						<div className="bg-[#00283A] p-2 rounded-lg mt-2 font-bold flex items-center text-white justify-between px-4">
							<h1>ACTIVITIES</h1>
							{showActivity ?
								<button className="bg-red-500 p-1 px-2 text-white rounded-lg" onClick={() => setShowActivity(false)}>HIDE</button>
								:
								<button className="bg-green-500 p-1 px-2 text-white rounded-lg" onClick={() => setShowActivity(true)}>SHOW</button>
							}
						</div>
						{showActivity ? (
							<div className="mx-4">
								<div className="flow-root overflow-y-auto h-[520px] scroll-my-20">
									<ul role="list" className="divide-y divide-gray-600">
										<li className="py-3 sm:py-4 font-bold ">
											<div className="flex items-center space-x-2">
												<div className="flex-1 min-w-0">
													<p className="lg:text-sm text-[10px]   truncate">
														Name
													</p>
												</div>
												<div className="flex-1 min-w-0">
													<p className="lg:text-sm text-[10px]  truncate">
														Description
													</p>
												</div>

											</div>
										</li>
										{activityData?.map(activity => (
											<li key={activity.id + activity.name} className="py-3 sm:py-4 cursor-pointer hover:bg-gray-100 px-2">
												<div className="flex items-center space-x-4">
													<div className="flex-1 min-w-0">
														<p className="lg:text-sm text-[10px]  text-gray-900 truncate">
															{activity.name}
														</p>
													</div>
													<div className="flex-1 min-w-0">
														<p className="lg:text-sm text-[10px]  text-gray-500 truncate">
															{activity.description}
														</p>
													</div>

												</div>
											</li>
										))}




									</ul>
								</div>
							</div>
						) : (
							<div className="flex flex-row pt-44 items-center justify-center">
								<p className="text-center">Please tap on the button <span className="font-bold">SHOW</span> to view all activties!</p>
							</div>
						)}
					</div>
					<div className="absolute bottom-10 right-10">

						<AddActivities />
					</div> */}
				</main>
			)}
		</>
	)
}

export default SingleChurchBranch