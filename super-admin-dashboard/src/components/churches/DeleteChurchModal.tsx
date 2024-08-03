import axios from "axios";
import { FC, FormEvent, useState } from "react";
import { CHURCH_API_URL } from "../../app/api";
import { toast } from "react-toastify";
import DeleteItem from "../modals/DeleteItem";

type DeleteChurchProp = {
	churchId: string;
	churchName: string;
}

const DeleteChurchModal:FC<DeleteChurchProp> = ({churchId, churchName}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleDeleteChurch = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		// console.log("handleDeleteChurchStaff", churchId);
	
		try {
			setIsLoading(true);
			// console.log('Processing deletion for staffId:', churchId);
			
			const response = await axios.delete(`${CHURCH_API_URL}/${churchId}`);
			
			console.log("Delete Church Response:", response);
			toast.success('Church deleted successfully');
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
				title={churchName}
				handleSubmit={handleDeleteChurch}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</>
  )
}

export default DeleteChurchModal