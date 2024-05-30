import { FormEvent, ReactElement, useState } from "react";
import UpdateItem from "../modal/UpdateItem";
import { useAppDispatch } from "@/app/hooks";
import { ChurchMinistry } from "@/types/ChurchMinistry";
import { updateChurchMinistry } from "@/features/church-ministry/churchMinistrySlice";
import toast from "react-hot-toast";
import Input from "@/components/forms/Input";

interface Props {
	id: string,
	name: string;
	leader: string
	description: string;
}

const EditChurchMinistry = ({ id, name, leader, description }: Props): ReactElement => {
	const [updatedName, setUpdatedName] = useState(name);
	const [updatedLeader, setUpdatedLeader] = useState(leader);
	const [updatedDescription, setUpdatedDescription] = useState(description);
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false)

	const dispatch = useAppDispatch();

	const handleUpdateChurchMinistry = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Create an object with the updated values
		try {
			setIsLoading(true);
			const updatedMinistry: Partial<ChurchMinistry> = {
				name: updatedName,
				leader: updatedLeader,
				description: updatedDescription,
			};

			// Dispatch 
			dispatch(updateChurchMinistry({ id, updatedData: updatedMinistry }));
			toast.success('Updated Successfully')
			setShowModal(false)
			console.log('update...', updatedMinistry)
		} catch (error) {
			console.error("Failed to update ministry", error)
			toast.error("Server Error update!!!")
		}
		finally {
			setIsLoading(false);
			setShowModal(false);
		}
	};
	return (
		<UpdateItem
			subtitle='Add New Church Ministry'
			handleSubmit={handleUpdateChurchMinistry}
			isLoading={isLoading}
			showModal={showModal}
			setShowModal={setShowModal}
		>
			<Input value={updatedName} setValue={setUpdatedName} label="Name" type="text" placeholder="Church Ministry Name" />
			<Input value={updatedLeader} setValue={setUpdatedLeader} label="Person in Charge" type="text" placeholder='Leader Name' />
			<label className='text-gray-500' >Description</label>
			<textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} className="border bg-gray-200 text-black rounded-lg h-[200px] w-full p-2 outline-[#200e32]" >
			</textarea>
		</UpdateItem>
	)
}

export default EditChurchMinistry