import { FormEvent, useState } from "react";
import Input from "../forms/Input";
import { ChurchService } from "@/types/ChurchService";
import { useAppDispatch } from "@/app/hooks";
import { updateChurchService } from "@/features/church-services/churchServiceSlice";
import toast from "react-hot-toast";
import UpdateItem from "../modal/UpdateItem";


interface Props {
	id: string,
	name: string;
	start: string
	end: string;
	language: string;
}

const EditChurchService = ({ id, name, start, end, language }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [updatedName, setUpdatedName] = useState(name);
	const [updatedStart, setUpdatedStart] = useState(start);
	const [updatedEnd, setUpdatedEnd] = useState(end);
	const [updatedLanguage, setUpdatedLanguage] = useState(language);

	const dispatch = useAppDispatch()


	const handleUpdateChurchService = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const updatedService: Partial<ChurchService> = {
				name: updatedName,
				start_time: updatedStart,
				end_time: updatedEnd,
				language: updatedLanguage
			};

			// Dispatch 
			dispatch(updateChurchService({ id, updatedData: updatedService }));
			toast.success('Updated Successfully')
			setShowModal(false)
			console.log('update...', updatedService)
		} catch (error) {
			console.error("Failed to update service", error)
			toast.error("Server Error update!!!")
		}
		finally {
			setIsLoading(false);
			setShowModal(false);
		}
	}
	return (
		<>
			<UpdateItem
				subtitle='Update Church Service'
				handleSubmit={handleUpdateChurchService}
				isLoading={isLoading}
				showModal={showModal}
				setShowModal={setShowModal}
			>
				<Input value={updatedName} setValue={setUpdatedName} label="Name" type="text" placeholder="Church Service Name" />
				<Input value={updatedStart} setValue={setUpdatedStart} label="Start At" type="text" placeholder="Start" />
				<Input value={updatedEnd} setValue={setUpdatedEnd} label="Start End" type="text" placeholder="Start End" />
				<Input value={updatedLanguage} setValue={setUpdatedLanguage} label="Language Used" type="text" placeholder="Lou - English" />


			</UpdateItem>
		</>
	)
}

export default EditChurchService