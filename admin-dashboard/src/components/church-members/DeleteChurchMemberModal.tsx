import axios from "axios";
import { FC, FormEvent, useState } from "react";
import { API_BASE_URL } from "../../app/api";
import { toast } from "react-toastify";
import DeleteItem from "../modals/DeleteItem";

type DeleteStaffProp = {
	memberId: string;
	fullName: string;
}

const DeleteChurchMemberModal: FC<DeleteStaffProp> = function ({memberId, fullName}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// console.log("handleDeleteChurchStaff", memberId);
	const handleDeleteChurchStaff = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		console.log("processing member id", memberId);
	
		try {
			setIsLoading(true);
			console.log('Processing deletion for memberId:', memberId);
			
			const response = await axios.delete(`${API_BASE_URL}/church-members/${memberId}`);
			
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
				title={fullName}
				handleSubmit={handleDeleteChurchStaff}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
			/>
		</>
	);
};

export default DeleteChurchMemberModal;