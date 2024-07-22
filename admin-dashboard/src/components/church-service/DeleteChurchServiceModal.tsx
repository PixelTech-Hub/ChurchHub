import { FC, FormEvent, useState } from 'react'
import DeleteItem from '../modals/DeleteItem';
import { API_BASE_URL } from '../../app/api';
import axios from 'axios';
import { toast } from 'react-toastify';

type DeleteServiceProp = {
	serviceId: string;
	serviceName: string;
}

const DeleteChurchServiceModal: FC<DeleteServiceProp> = ({ serviceId, serviceName }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// console.log("handleDeleteChurchStaff", memberId);
	const handleDeleteChurchService = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		console.log("processing member id", serviceId);
	
		try {
			setIsLoading(true);
			console.log('Processing deletion for memberId:', serviceId);
			
			const response = await axios.delete(`${API_BASE_URL}/church_services/${serviceId}`);
			
			console.log("Delete Church Service Response:", response);
			toast.success('Church Service deleted successfully');
			setIsOpen(false);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Delete Church Service Axios Error:", error.response?.data);
				toast.error(`Failed to delete church Service: ${error.response?.data?.message || error.message}`);
			} else {
				console.error("Delete Church Service Error:", error);
				toast.error('Failed to delete church Service');
			}
		} finally {
			setIsLoading(false);
		}
	};



	// console.log("staffId:++++++++",staffId)
	return (
		<>
			<DeleteItem
				title={serviceName}
				handleSubmit={handleDeleteChurchService}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			>


			</DeleteItem>
		</>
	)
}

export default DeleteChurchServiceModal