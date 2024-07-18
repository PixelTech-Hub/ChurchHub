import axios from "axios";
import { FC, FormEvent, useState } from "react";
import { API_BASE_URL } from "../../app/api";
import { toast } from "react-toastify";
import DeleteItem from "../modals/DeleteItem";

type DeleteMinistryProp = {
	ministryId: string;
	name: string;
}

const DeleteChurchMinistryModal: FC<DeleteMinistryProp> = function ({ministryId, name}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// console.log("handleDeleteChurchStaff", memberId);
	const handleDeleteChurchMinistry = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		console.log("processing member id", ministryId);
	
		try {
			setIsLoading(true);
			console.log('Processing deletion for ministryId:', ministryId);
			
			const response = await axios.delete(`${API_BASE_URL}/church_ministries/${ministryId}`);
			
			console.log("Delete Church Ministry Response:", response);
			toast.success(`${name} deleted successfully`);
			setIsOpen(false);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Delete Church Staff Axios Error:", error.response?.data);
				toast.error(`Failed to delete church staff: ${error.response?.data?.message || error.message}`);
			} else {
				console.error("Delete Church Staff Error:", error);
				toast.error('Failed to delete church staff');
			}
		} finally {
			setIsLoading(false);
		}
	};



	// console.log("staffId:++++++++",staffId)
	return (
		<>
			<DeleteItem
				title={name}
				handleSubmit={handleDeleteChurchMinistry}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			>


			</DeleteItem>
		</>
  )
}

export default DeleteChurchMinistryModal