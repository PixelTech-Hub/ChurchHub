import { useState } from "react"
import DeleteItem from "../modal/DeleteItem"
import { useAppDispatch } from "@/app/hooks"
import { deleteInsight } from "@/features/insights/insightSlice"
import toast from "react-hot-toast"


interface DeleteBlogProps {
	id?: string,
	name: string,
}
const DeleteBlog = ({ id, name }: DeleteBlogProps) => {
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// console.log(id)
	const dispatch = useAppDispatch()
	const handleDeleteChurchEvent = async (e: any) => {
		e.preventDefault()
		// console.log(id)
		try {
			setIsLoading(true)
			await dispatch(deleteInsight(id));
			toast.success(`Church Event Deleted successfully`)
			setShowModal(false)
			setIsLoading(false)
			// console.log(`${row.getValue("name")}`);
		} catch (error) {
			console.error("Failed to delete sermon:", error);
			setIsLoading(false)
			// Handle error if needed
		}

	};
	return (
		<DeleteItem
			title={name}
			handleSubmit={handleDeleteChurchEvent}
			showModal={showModal}
			setShowModal={setShowModal}
			isLoading={isLoading}
		>
			{""}

		</DeleteItem>
	)
}

export default DeleteBlog