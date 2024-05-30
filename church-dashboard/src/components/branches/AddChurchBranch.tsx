import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';
import { createNewChurchBranch } from '@/features/church-branches/churchBranchesSlice';
import toast from 'react-hot-toast';
import Input from '../forms/Input';
import AddItem from '../modal/AddItem';
import { getAllChurches } from '@/features/churches/churchSlice';

const AddChurchBranch = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false);
	const [mainChurchId, setChurchId] = useState("")
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState("");
	const [churchNumber, setChurchNumber] = useState("");
	const [location, setLocation] = useState("");

	const [showModal, setShowModal] = useState(false);


	const churches = useAppSelector(state => state.churches.data)

	useEffect(() => {
		dispatch(getAllChurches())
	}, [])


	// console.log('churches', churches);






	const handleCreateChurchBranch = async (e: any) => {
		e.preventDefault();
		try {
			if (!name) {
				toast.error("Please fill in the name");
				return;
			}
			else if (
				!email) {
				toast.error("Please fill in the email address");
				return;
			}
			if (!dob) {
				toast.error("Please fill in the date launched");
				return;
			}
			else if (
				!churchNumber) {
				toast.error("Please fill in the office contact");
				return;
			}
			else if (
				!location) {
				toast.error("Please fill in the location");
				return;
			}
			else {
				setIsLoading(true);
				const branchData = { mainChurchId, name, email, dob, church_number: churchNumber, location };
				await dispatch(createNewChurchBranch(branchData));
				toast.success(`${name} created successfully`)
				setName("");
				setEmail("");
				setDob("");
				setChurchNumber("");
				setLocation("");
				setChurchId("");
				setShowModal(false);
				console.log("New branch created successfully", branchData);
			}

		} catch (error) {
			console.error("Failed to create branch:", error);
			toast.error("Network Error!!")
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<>

			<AddItem
				title='Add New Branch'
				subtitle='Add New Church Branch'
				handleSubmit={handleCreateChurchBranch}
				isLoading={isLoading}
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<Input value={name} setValue={setName} label="Name" type="text" placeholder="Church Branch Name" />
				<Input value={email} setValue={setEmail} label="Email" type="email" placeholder='Email Address' />
				<Input value={dob} setValue={setDob} label="Date Launched" type="date" placeholder="" />
				<Input value={churchNumber} setValue={setChurchNumber} label="Office Number" type="tel" placeholder="+25677283751" />
				<Input value={location} setValue={setLocation} label="Address" type="text" placeholder="location" />
				<select name="" id="" value={mainChurchId} onChange={(e) => setChurchId(e.target.value)}>
					{churches?.map(church => (
						<option key={church.id} value={church.id}>{church.name}</option>
					))}
				</select>
			</AddItem>

		</>
	)
}

export default AddChurchBranch