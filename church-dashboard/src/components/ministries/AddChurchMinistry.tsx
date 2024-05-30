import { useAppDispatch, useAppSelector } from '@/app/hooks';
import AddItem from '@/components/modal/AddItem';
import { FormEvent, useEffect, useState } from 'react';
import { getAllChurches } from '@/features/churches/churchSlice';
import toast from 'react-hot-toast';
import Input from '@/components/forms/Input';
import { createNewChurchMinistry } from '@/features/church-ministry/churchMinistrySlice';

const AddChurchMinistry = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false);
	const [churchId, setChurchId] = useState("")
	const [name, setName] = useState("");
	const [leader, setLeader] = useState("");
	const [description, setDescription] = useState("");

	const [showModal, setShowModal] = useState(false);


	const churches = useAppSelector(state => state.churches.data)

	useEffect(() => {
		dispatch(getAllChurches())
	}, [])


	// console.log('churches', churches);


	const handleCreateChurchMinistry = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!name) {
				toast.error("Please fill in the name");
				return;
			}
			else if (
				!leader) {
				toast.error("Please fill in the email address");
				return;
			}
			if (!description) {
				toast.error("Please fill in the ministry description");
				return;
			}
			else {
				setIsLoading(true);
				const ministryData = { churchId, name, description, leader };
				await dispatch(createNewChurchMinistry(ministryData));
				toast.success(`${name} created successfully`)
				setName("");
				setLeader("");
				setDescription("");
				setChurchId("");
				setShowModal(false);
				console.log("New Ministry created successfully", ministryData);
			}

		} catch (error) {
			console.error("Failed to create service:", error);
			toast.error("Network Error!!")
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<AddItem
			title='Add New Service'
			subtitle='Add New Church Ministry'
			handleSubmit={handleCreateChurchMinistry}
			isLoading={isLoading}
			showModal={showModal}
			setShowModal={setShowModal}
		>
			<Input value={name} setValue={setName} label="Name" type="text" placeholder="Church Ministry Name" />
			<Input value={leader} setValue={setLeader} label="Person in Charge" type="text" placeholder='Leader Name' />

			<label
				className='text-gray-500'
				htmlFor={description}
			>
				Description
			</label>
			<textarea
				name={description}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="border bg-gray-200 rounded-lg h-[200px] w-full p-2 outline-[#200e32]"
			>

			</textarea>

			<select name="" id="" value={churchId} onChange={(e) => setChurchId(e.target.value)}>
				{churches?.map(church => (
					<option key={church.id} value={church.id}>{church.name}</option>
				))}
			</select>
		</AddItem>
	)
}

export default AddChurchMinistry