import { AiOutlinePlus } from 'react-icons/ai';
import Input from '../forms/Input';
import AddItem from '../modal/AddItem';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddActivities = () => {
	const [showModal, setShowModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")

	// const dispatch = useAppDispatch()

	const addNewActivity = async (e: any) => {
		e.preventDefault()

		const mainChurchId = 'dvxvdxdr'
		try {
			setIsLoading(true);
			const activityData = { mainChurchId, name, description };
			// await dispatch(createNewChurchBranch(branchData));
			toast.success(`${name} created successfully`)
			setName("");
			setDescription("")
			setShowModal(false)
			console.log("New activity created successfully", activityData);
		} catch (error) {
			console.error("Failed to create branch:", error);
		} finally {
			setIsLoading(false);
			setShowModal(false)
		}
	}

	
	return (
		<AddItem
			title="+" 
			subtitle='Add your recent activiy'
			handleSubmit={addNewActivity}
			isLoading={isLoading}
			showModal={showModal}
			setShowModal={setShowModal}
		>
			<Input value={name} setValue={setName} label="Name" type="text" placeholder="Activity Name" />
			<div>
				<label className='text-gray-500' htmlFor={description}>Description</label>
				<textarea name={description} className="border bg-gray-200 rounded-lg h-[200px] w-full p-2 outline-[#200e32]" placeholder='Description here'>
				</textarea>
			</div>
		</AddItem>
	)
}

export default AddActivities