import { API_BASE_URL } from "@/app/api";
import EditChurchEvent from "@/components/blogs/EditChurchEvent";
import { Insight } from "@/types/Insight";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCalendar, AiOutlineReload } from "react-icons/ai";
import { Link, useLocation, useParams } from "react-router-dom";
import BeatLoader from 'react-spinners/BeatLoader'


const SingleBlog = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false)
	const [blog, setBlog] = useState<Insight>({} as Insight);

	const location = useLocation();

	const refreshPage = () => {
		window.location.href = location.pathname; // Reload the current page
	};




	// const navigate = useNavigate()

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${API_BASE_URL}/insights/${id}`)
			.then((response) => {
				setBlog(response.data)
				setLoading(false)
			}
			)
			.catch((error) => {
				console.error(error)
				setLoading(false)
			})
	}, []);


	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString(); // You can customize the format as needed
	}


	return (
		<>
			{loading ? <div className="flex flex-row items-center justify-center p-64">

				<BeatLoader color="#200e32" size={30} />
			</div> : (
				<main className="mt-4 mx-4 mb-24">
					<div className="bg-[#00283A] text-white my-3 p-2 px-4 rounded-lg flex items-center justify-between lg:text-lg text-sm font-bold">
						<Link to="/app/blogs" className="flex items-center"><AiOutlineArrowLeft size={30} /><p className="hidden lg:flex">Go Back</p></Link>
						<h1 className="uppercase hidden lg:flex">{blog.name}

						</h1>
						<Link to={location.pathname} onClick={refreshPage} className="flex items-center gap-1">
							<AiOutlineReload />Reload
						</Link>
					</div>
					<section className="lg:mt-10 mt-4">
						<div className="flex lg:flex-row flex-col gap-3 w-full">
							<div className="overflow-hidden bg-white lg:w-1/2 w-full lg:h-[450px] h-[200px] rounded-lg">
								<img src={blog.image} alt={blog.name} className="lg:w-[800px] w-full lg:h-[450px] h-[200px] rounded-lg object-cover bg-center  hover:scale-110 transition-all duration-300" />
							</div>
							<div className="relative lg:w-1/2 w-full">
								<p className="font-bold lg:text-3xl text-xl">{blog.name}</p>
								{blog.date && (
									<div className="flex flex-col lg:flex-row lg:items-center lg:gap-36">
										<p className="lg:text-xl text-lg flex items-center gap-1">
											<AiOutlineCalendar size={30} />Date Scheduled:
											{" "}{formatDate(blog.date)}
										</p>
										<p className="font-bold lg:text-xl text-lg">Comments {blog.comments?.length}</p>
									</div>
								)}
								{/* Check if blog.ministry is a string */}
								{typeof blog.ministry === 'object' ? (
									<div>
										<p className="lg:text-xl text-lg">
											<span className="font-bold">{blog.ministry.name} </span>
											Led By
											<span className="font-bold"> {blog.ministry.leader}</span>
										</p>
										<p className="lg:text-xl text-lg font-bold">Status: {" "} <span className="text-green-500 font-bold">{blog.event_type}</span></p>
									</div>
								) : null}

								<p className="lg:pt-4 pt-2">
									{blog.message}
								</p>
								<div className="lg:absolute lg:bottom-2 mt-2">
									<EditChurchEvent
										id={blog.id ?? ''}
										name={blog.name ?? ''}
										ministryId={blog.ministryId ?? ''}
										date={blog.date ?? ''}
										image={blog.image ?? ''}
										message={blog.message ?? ''}
										eventType={blog.event_type ?? ''}
									/>
								</div>
							</div>
						</div>
					</section>

				</main>
			)}
		</>
	)
}

export default SingleBlog