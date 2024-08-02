
import { FC, FormEvent, useState } from "react";
import DeleteItem from "../modals/DeleteItem";
import { toast } from "react-toastify";
import {  useAppSelector } from "../../app/hooks";


type DeleteStaffProp = {
	staffId: string;
	staffName: string;
}

const DeleteChurchStaffModal:FC<DeleteStaffProp> = function ({  staffName }) {
	const [isOpen, setIsOpen] = useState(false);
	// const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const handleDeleteChurchStaff = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			// await dispatch((serviceId)).unwrap();
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
				title={staffName}
				handleSubmit={handleDeleteChurchStaff}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isLoading={isLoading}
				// setIsLoading={setIsLoading}
			/>
		</>
	);
};

export default DeleteChurchStaffModal;