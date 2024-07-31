import { FC, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import DeleteItem from "../modals/DeleteItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteChurchMinistry } from "../../features/church-ministries/ministrySlice";

type DeleteMinistryProp = {
	ministryId: string;
	name: string;
}

const DeleteChurchMinistryModal: FC<DeleteMinistryProp> = function ({ministryId, name}) {
	const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { deleting } = useAppSelector((state) => state.ministry);

    const handleDeleteChurchMinistry = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			await dispatch(deleteChurchMinistry(ministryId)).unwrap();
			toast.success('Deleted successfully');
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
	return (
		<>
			<DeleteItem
				title={name}
				handleSubmit={handleDeleteChurchMinistry}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={deleting}
			>


			</DeleteItem>
		</>
  )
}

export default DeleteChurchMinistryModal