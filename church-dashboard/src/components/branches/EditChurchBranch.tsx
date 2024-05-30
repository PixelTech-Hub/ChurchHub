import { ReactElement, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { ChurchBranches } from "@/types/ChurchBrances";
import { updateChurchBranch } from "@/features/church-branches/churchBranchesSlice";
import toast from "react-hot-toast";
import AddItem from "../modal/AddItem";
import Input from "../forms/Input";

interface Props {
	id: string,
	name: string;
	email: string
	dob: string;
	telephone: string;
	location: string;
}

const EditChurchBranch = ({ id, name, email, dob, telephone, location }: Props): ReactElement => {

	const [updatedName, setUpdatedName] = useState(name);
	const [updatedEmail, setUpdatedEmail] = useState(email);
	const [updatedDob, setUpdatedDob] = useState(dob);
	const [updatedTelephone, setUpdatedTelephone] = useState(telephone);
	const [updatedLocation, setUpdatedLocation] = useState(location);
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false)

	const dispatch = useAppDispatch();

	const handleUpdateChurchBranch = async (e: any) => {
		e.preventDefault();
		// Create an object with the updated values
		try {
			setIsLoading(true);
			const updatedBranch: Partial<ChurchBranches> = {
				name: updatedName,
				email: updatedEmail,
				dob: updatedDob,
				church_number: updatedTelephone,
				location: updatedLocation
			};

			// Dispatch 
			dispatch(updateChurchBranch({ id, updatedData: updatedBranch }));
			toast.success('Updated Successfully')
			setShowModal(false)
			console.log('update...', updatedBranch)
		} catch (error) {
			console.error("Failed to update branch", error)
			toast.error("Server Error update!!!")
		}
		finally {
			setIsLoading(false);
			setShowModal(false);
		}
	};
	return (
		<>
			<AddItem
				title='Update'
				subtitle='Update Church Branch'
				handleSubmit={handleUpdateChurchBranch}
				isLoading={isLoading}
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<Input value={updatedName} setValue={setUpdatedName} label="Name" type="text" placeholder="Church Branch Name" />
				<Input value={updatedEmail} setValue={setUpdatedEmail} label="Email" type="email" placeholder='Email Address' />
				<Input value={updatedDob} setValue={setUpdatedDob} label="Date Launched" type="date" placeholder="" />
				<Input value={updatedTelephone} setValue={setUpdatedTelephone} label="Office Number" type="tel" placeholder="+25677283751" />
				<Input value={updatedLocation} setValue={setUpdatedLocation} label="Address" type="text" placeholder="location" />
			</AddItem>
		</>
	)
}

export default EditChurchBranch