import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { deleteChurchService } from "@/features/church-services/churchServiceSlice";
import toast from "react-hot-toast";
import DeleteItem from "../modal/DeleteItem";

interface DeleteProps {
	id: string;
	name: string;
}

const DeleteChurchService = ({ id, name }: DeleteProps) => {
	// console.log(id)
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// console.log(id)
	const dispatch = useAppDispatch()

	const handleDeleteChurchService = async (e: any) => {
		e.preventDefault()
		// console.log(id)
		const churchServiceId: string = id;
		try {
			setIsLoading(true)
			await dispatch(deleteChurchService(churchServiceId));
			toast.success(`Church ${name} Deleted successfully`)
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
			handleSubmit={handleDeleteChurchService}
			showModal={showModal}
			setShowModal={setShowModal}
			isLoading={isLoading}
		>
			{""}

		</DeleteItem>
	)
}

export default DeleteChurchService