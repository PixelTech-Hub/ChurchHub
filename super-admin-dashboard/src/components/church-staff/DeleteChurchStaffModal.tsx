
import { FormEvent, useState } from "react";
import DeleteItem from "../modals/DeleteItem";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../app/api";
import axios from "axios";


type DeleteStaffProp = {
	staffId: string;
	staffFirstName: string;
	staffLastName: string;
}

const DeleteChurchStaffModal = function ({staffId,  staffFirstName }: DeleteStaffProp) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleDeleteChurchStaff = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		console.log("handleDeleteChurchStaff", staffId);
	
		try {
			setIsLoading(true);
			console.log('Processing deletion for staffId:', staffId);
			
			const response = await axios.delete(`${API_BASE_URL}/church-staffs/${staffId}`);
			
			console.log("Delete Church Staff Response:", response);
			toast.success('Church staff deleted successfully');
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
				title={staffFirstName}
				handleSubmit={handleDeleteChurchStaff}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</>
	);
};

export default DeleteChurchStaffModal;