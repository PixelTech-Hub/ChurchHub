import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddChurchEvent from "@/components/blogs/AddChurchEvent";
import BlogTable from "@/components/blogs/BlogTable";
import PageHeader from "@/components/layout/PageHeader";
import { getAllInsights } from "@/features/insights/insightSlice";
import { useEffect } from "react";


const BlogPage = () => {
	const dispatch = useAppDispatch()
	const events = useAppSelector(state => state.blogs.data) || [];


	useEffect(() => {
		dispatch(getAllInsights())
	}, [events])




	return (
		<>
			<main className="relative z-0 mb-24">
				<PageHeader title="Church Events">
					<AddChurchEvent />
				</PageHeader>
				<div className="mt-4 mx-4">
					<BlogTable church_events={events ?? []} />
				</div>
			</main >
		</>
	)
}

export default BlogPage