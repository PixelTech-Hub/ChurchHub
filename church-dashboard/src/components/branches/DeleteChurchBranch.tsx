
import { useAppDispatch } from '@/app/hooks';
import { deleteChurchBranch } from '@/features/church-branches/churchBranchesSlice';
import toast from 'react-hot-toast';
import DeleteItem from '../modal/DeleteItem';
import { useState } from 'react';


interface Props {
	id?: string,
	name: string,
}
const DeleteChurchBranch = ({ id, name }: Props) => {
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	// console.log(id)
	const dispatch = useAppDispatch()
	const handleDeleteChurchBranch = async (e: any) => {
		e.preventDefault()
		// console.log(id)
		try {
			setIsLoading(true)
			await dispatch(deleteChurchBranch(id));
			toast.success(`Church Branch Deleted successfully`)
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

		<>
			<DeleteItem
				title={name}
				handleSubmit={handleDeleteChurchBranch}
				showModal={showModal}
				setShowModal={setShowModal}
				isLoading={isLoading}
			>
				{""}

			</DeleteItem>
		</>
	)
}

export default DeleteChurchBranch