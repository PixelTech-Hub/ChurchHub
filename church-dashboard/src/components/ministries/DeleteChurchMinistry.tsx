import { ReactElement, useState } from "react"
import DeleteItem from "../modal/DeleteItem"
import { useAppDispatch } from "@/app/hooks";
import { DeleteChurchMinistryById } from "@/features/church-ministry/churchMinistrySlice";
import toast from "react-hot-toast";

interface Props {
	id: string;
	name: string;
}

const DeleteChurchMinistry = ({ id, name }: Props): ReactElement => {
	// console.log(id)
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// console.log(id)
	const dispatch = useAppDispatch()

	const handleDeleteChurchMinistry = async (e: any) => {
		e.preventDefault()
		// console.log(id)
		const churchMinistryId: string = id;
		try {
			setIsLoading(true)
			await dispatch(DeleteChurchMinistryById(churchMinistryId));
			toast.success(`${name} Deleted successfully`)
			setShowModal(false)
			setIsLoading(false)
			// console.log(`${row.getValue("name")}`);
		} catch (error) {
			console.error("Failed to delete ministry:", error);
			setIsLoading(false)
			// Handle error if needed
		}

	};
	return (
		<DeleteItem
			title={name}
			handleSubmit={handleDeleteChurchMinistry}
			showModal={showModal}
			setShowModal={setShowModal}
			isLoading={isLoading}
		>
			{""}

		</DeleteItem>
	)
}

export default DeleteChurchMinistry