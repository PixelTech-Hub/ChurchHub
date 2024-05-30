import { useAppDispatch } from "@/app/hooks";
import { deleteAChurchStaff } from "@/features/staffs/staffSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteItem from "../modal/DeleteItem";


interface Props {
	id?: string;
	firstname?: string;
	lastname?: string;
}

const DeleteStaffCard = ({ id, firstname, lastname }: Props) => {
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// console.log(id)
	const dispatch = useAppDispatch()
	const handleDeleteChurchStaff = async (e: any) => {
		e.preventDefault()
		// console.log(id)
		try {
			setIsLoading(true)
			await dispatch(deleteAChurchStaff(id));
			toast.success(`Church Staff Deleted successfully`)
			setShowModal(false)
			setIsLoading(false)
			// console.log(`${row.getValue("name")}`);
		} catch (error) {
			console.error("Failed to delete staff:", error);
			setIsLoading(false)
			// Handle error if needed
		}

	};
	return (

		<>
			<DeleteItem
				title={` ${firstname} ${lastname}`}
				handleSubmit={handleDeleteChurchStaff}
				showModal={showModal}
				setShowModal={setShowModal}
				isLoading={isLoading}
			>
				{""}

			</DeleteItem>
		</>
	)
}

export default DeleteStaffCard