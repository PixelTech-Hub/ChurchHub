import { FC, FormEvent, useState } from 'react'
import DeleteItem from '../modals/DeleteItem';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteChurchService } from '../../features/church-services/serviceSlice';

type DeleteServiceProp = {
	serviceId: string;
	serviceName: string;
}

const DeleteChurchServiceModal: FC<DeleteServiceProp> = ({ serviceId, serviceName }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
    const { deleting } = useAppSelector((state) => state.service);

    const handleDeleteChurchService = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			await dispatch(deleteChurchService(serviceId)).unwrap();
			toast.success('Church branch deleted successfully');
			setIsOpen(false);
		} catch (error) {
			if (error instanceof Error) {
				// Handle the case where `error` is an `Error` object
				toast.error(`Failed to delete church branch: ${error.message}`);
			} else {
				// Handle other types of errors
				toast.error('Failed to delete church branch');
			}
		} finally {
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
				isLoading={deleting}
			>


			</DeleteItem>
		</>
	)
}

export default DeleteChurchServiceModal