import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createNewChurchService } from '@/features/church-services/churchServiceSlice';
import toast from 'react-hot-toast';
import AddItem from '../modal/AddItem';
import Input from '../forms/Input';
import { getAllChurches } from '@/features/churches/churchSlice';

const AddChurchService = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [name, setName] = useState("")
	const [start, setStart] = useState("")
	const [end, setEnd] = useState("")
	const [language, setLanguage] = useState("")
	const [churchId, setChurchId] = useState("")


	const dispatch = useAppDispatch()


	const churches = useAppSelector(state => state.churches.data)

	useEffect(() => {
		dispatch(getAllChurches())
	}, [])



	const handleCreateChurchBranch = async (e: any) => {
		e.preventDefault();


		try {
			setIsLoading(true);
			const serviceData = { churchId, name, start_time: start, end_time: end, language };
			await dispatch(createNewChurchService(serviceData));
			toast.success(`${name} created successfully`);
			setName("");
			setStart("")
			setEnd("")
			setLanguage("")
			setShowModal(false)
			console.log("New Service created successfully", serviceData);
		} catch (error) {
			console.error("Failed to create service:", error);
			toast.error("Failed to create service");
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<>

			<AddItem
				title='Add New Service'
				subtitle='Add New Church Branch'
				handleSubmit={handleCreateChurchBranch}
				isLoading={isLoading}
				showModal={showModal}
				setShowModal={setShowModal}
			>

				<Input value={name} setValue={setName} label="Service Name" type="text" placeholder="Church Service Name" />
				<Input value={start} setValue={setStart} label="Start At" type="time" placeholder="Start At" />
				<Input value={end} setValue={setEnd} label="Start End" type="time" placeholder="Start End" />
				<Input value={language} setValue={setLanguage} label="Language Used" type="text" placeholder="Lou - English" />

				<select name="" id="" value={churchId} onChange={(e) => setChurchId(e.target.value)}>
					{churches?.map(church => (
						<option key={church.id} value={church.id}>{church.name}</option>
					))}
				</select>
			</AddItem>

		</>
	)
}

export default AddChurchService