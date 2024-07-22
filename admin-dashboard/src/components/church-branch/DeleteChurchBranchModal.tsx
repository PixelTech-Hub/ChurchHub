import axios from "axios";
import { FC, FormEvent, useState } from "react"
import { API_BASE_URL } from "../../app/api";
import { toast } from "react-toastify";
import DeleteItem from "../modals/DeleteItem";

type DeleteBranchProp = {
	branchId: string;
	branchName: string;
}


const DeleteChurchBranchModal:FC<DeleteBranchProp> = ({branchId, branchName}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// console.log("handleDeleteChurchStaff", memberId);
	const handleDeleteChurchBranch = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		// console.log("processing branch id", branchName);
	
		try {
			setIsLoading(true);
			console.log('Processing deletion for branchId:', branchName);
			
			const response = await axios.delete(`${API_BASE_URL}/church_branches/${branchId}`);
			
			console.log("Delete Church branch Response:", response);
			toast.success('Church branch deleted successfully');
			setIsOpen(false);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Delete Church branch Axios Error:", error.response?.data);
				toast.error(`Failed to delete church branch: ${error.response?.data?.message || error.message}`);
			} else {
				console.error("Delete Church branch Error:", error);
				toast.error('Failed to delete church branch');
			}
		} finally {
			setIsLoading(false);
		}
	};



	// console.log("staffId:++++++++",staffId)
	return (
		<>
			<DeleteItem
				title={branchName}
				handleSubmit={handleDeleteChurchBranch}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			>


			</DeleteItem>
		</>
  )
}

export default DeleteChurchBranchModal