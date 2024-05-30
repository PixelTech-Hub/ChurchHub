import { FormEvent, useEffect, useState } from "react";
import UpdateItem from "../modal/UpdateItem"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Input from "../forms/Input";
import { getAllChurchMinistries } from "@/features/church-ministry/churchMinistrySlice";
import { Insight } from "@/types/Insight";
import { updateInsight } from "@/features/insights/insightSlice";
import toast from "react-hot-toast";
import { API_CLOUDARE_URL } from "@/app/api";


interface EditEventProps {
	id: string
	name: string
	ministryId: string
	date: string
	image: string
	message: string
	eventType: string
}


const EditChurchEvent = ({ id, name, ministryId, date, image, message, eventType }: EditEventProps) => {
	const [updatedName, setUpdatedName] = useState(name);
	const [updatedMinistryId, setUpdatedMinistryId] = useState(ministryId);
	const [updatedEventType, setUpdatedEventType] = useState(eventType);
	const [updatedDate, setUpdatedDate] = useState(date);
	const [updatedImage, setUpdatedImage] = useState<File | null>(null);
	const [updatedMessage, setUpdatedMessage] = useState(message);
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false)

	const dispatch = useAppDispatch();

	const ministries = useAppSelector(state => state.ministries.data)

	useEffect(() => {
		dispatch(getAllChurchMinistries())
	}, [])

	const handleUpdateChurchEvent = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Create an object with the updated values
		const handleUpdateImage = async () => {
			try {
				const data = new FormData();
				data.append('file', image);
				data.append('upload_preset', 'insight_preset');
				data.append('cloud_name', 'dgfsgfzee');

				// Upload the image to Cloudinary
				const response = await fetch(`${API_CLOUDARE_URL}`, {
					method: 'POST',
					body: data,
				});

				if (!response.ok) {
					throw new Error('Image upload failed');
				}

				const responseData = await response.json();
				console.log(responseData)
				return responseData.url;
			} catch (error) {
				console.error(error);
				throw error;
			}
		};

		try {
			const imageUrl = await handleUpdateImage();
			setIsLoading(true);
			const updatedEvent: Partial<Insight> = {
				name: updatedName,
				ministryId: updatedMinistryId,
				event_type: updatedEventType,
				message: updatedMessage,
				date: updatedDate,
				image: imageUrl

			};

			// Dispatch 
			dispatch(updateInsight({ id, updatedData: updatedEvent }));
			toast.success('Updated Successfully')
			setShowModal(false)
			console.log('update...', updatedEvent)
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
			subtitle='Update Church Event'
			handleSubmit={handleUpdateChurchEvent}
			isLoading={isLoading}
			showModal={showModal}
			setShowModal={setShowModal}
		>
			<Input value={updatedName} setValue={setUpdatedName} label="Event Name" type="text" placeholder="Church Branch Name" />
			<div className="flex flex-col gap-4 text-gray-500">
				<div className="flex flex-col ">
					<label htmlFor="">Church Ministry</label>
					<select className="bg-gray-200 p-2 rounded-lg" value={updatedMinistryId} onChange={(e) => setUpdatedMinistryId(e.target.value)}>
						<option value="">Select Ministry</option>
						{ministries?.map(ministry => (
							<option key={ministry.id} value={ministry.id}>{ministry.name}</option>
						))}
					</select>
				</div>
				<div className="flex flex-col ">
					<label >Event Type</label>
					<select className="bg-gray-200 p-2 rounded-lg" value={updatedEventType} onChange={(e) => setUpdatedEventType(e.target.value)}>
						<option value="">Select Event Type</option>
						<option value='upcoming'>Upcoming Event</option>
						<option value='past'>Past Event</option>
					</select>
				</div>
				<Input value={updatedDate} setValue={setUpdatedDate} label="Event Date" type="datetime-local" placeholder="" />
				<div className=' gap-2'>
					<input
						type="file"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const fileList = e.target.files;
							if (fileList && fileList.length > 0) {
								setUpdatedImage(fileList[0]);
							} else {
								setUpdatedImage(null);
							}
						}}
						className='outline-[#200e32] bg-gray-200 text-black w-full rounded-md p-1 lg:text-[14px] text-[12px]'
					/>

				</div>
				<div>
					<label className='text-gray-500' htmlFor={updatedMessage}>Description</label>
					<textarea value={message} onChange={(e) => setUpdatedMessage(e.target.value)} className="border bg-gray-200 rounded-lg h-[170px] w-full p-2 outline-[#200e32]" placeholder='Description here'>
					</textarea>
				</div>
			</div>
		</UpdateItem>
	)
}

export default EditChurchEvent