import { FC, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks"; 
import { deleteChurchBranch } from "../../features/church-branches/branchSlice"; 
import DeleteItem from "../modals/DeleteItem";

type DeleteBranchProp = {
    branchId: string;
    branchName: string;
};

const DeleteChurchBranchModal: FC<DeleteBranchProp> = ({ branchId, branchName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { deleting } = useAppSelector((state) => state.branch);

    const handleDeleteChurchBranch = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			await dispatch(deleteChurchBranch(branchId)).unwrap();
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
	

    return (
        <>
            <DeleteItem
                title={branchName}
                handleSubmit={handleDeleteChurchBranch}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLoading={deleting}
            />
        </>
    );
};

export default DeleteChurchBranchModal;
