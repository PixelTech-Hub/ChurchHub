import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddItem from "../modal/AddItem"
import { FormEvent, useEffect, useState } from "react";
import { getAllChurches } from "@/features/churches/churchSlice";
import { getAllChurchMinistries } from "@/features/church-ministry/churchMinistrySlice";
import toast from "react-hot-toast";
import Input from "../forms/Input";
import { API_CLOUDARE_URL } from "@/app/api";
import { createNewInsight } from "@/features/insights/insightSlice";


const AddChurchEvent = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false);
	const [churchId, setChurchId] = useState("")
	const [name, setName] = useState("");
	const [ministryId, setMinistryId] = useState("")
	const [eventType, setEventType] = useState("");
	const [date, setDate] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [message, setMessage] = useState("");

	const [showModal, setShowModal] = useState(false);


	const churches = useAppSelector(state => state.churches.data)
	const ministries = useAppSelector(state => state.ministries.data)

	useEffect(() => {
		dispatch(getAllChurches())
	}, [])

	useEffect(() => {
		dispatch(getAllChurchMinistries())
	}, [])

	const handleCreateChurchEvent = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name) {
			toast.error("Please fill in the name");
			return;
		}
		else if (
			!eventType) {
			toast.error("Please select the event type");
			return;
		}
		if (!date) {
			toast.error("Please fill in the date launched");
			return;
		}
		else if (!image) {
			toast.error("Please upload the image");
			return;
		}
		else if (!message) {
			toast.error("Please give the message");
			return;
		}
		const sendImage = async () => {
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
			const imageUrl = await sendImage();



			setIsLoading(true);
			const insightData = { churchId, name, ministryId, event_type: eventType, message, date, image: imageUrl };
			await dispatch(createNewInsight(insightData));
			toast.success(`${name} created successfully`)
			setName("");
			setMinistryId("");
			setEventType("");
			setDate("");
			setMessage("");
			setShowModal(false);
			console.log("New Event created successfully", insightData);
		}

		catch (error) {
			console.error("Failed to create an event:", error);
			toast.error("Network Error!!")
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<AddItem
			title='Add New Event'
			subtitle='Add New Church Event'
			handleSubmit={handleCreateChurchEvent}
			isLoading={isLoading}
			showModal={showModal}
			setShowModal={setShowModal}
		>
			<Input value={name} setValue={setName} label="Event Name" type="text" placeholder="Church Branch Name" />
			<div className="flex flex-col gap-4 text-gray-500">
				<div className="flex flex-col ">
					<label htmlFor="">Church Ministry</label>
					<select className="bg-gray-200 p-2 rounded-lg" value={ministryId} onChange={(e) => setMinistryId(e.target.value)}>
						<option value="">Select Ministry</option>
						{ministries?.map(ministry => (
							<option key={ministry.id} value={ministry.id}>{ministry.name}</option>
						))}
					</select>
				</div>
				<div className="flex flex-col ">
					<label >Event Type</label>
					<select className="bg-gray-200 p-2 rounded-lg" value={eventType} onChange={(e) => setEventType(e.target.value)}>
						<option value="">Select Event Type</option>
						<option value='upcoming'>Upcoming Event</option>
						<option value='past'>Past Event</option>
					</select>
				</div>
				<Input value={date} setValue={setDate} label="Event Date" type="datetime-local" placeholder="" />
				<div className=' gap-2'>
					<input
						type="file"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const fileList = e.target.files;
							if (fileList && fileList.length > 0) {
								setImage(fileList[0]);
							} else {
								setImage(null);
							}
						}}
						className='outline-[#200e32] bg-gray-200 text-black w-full rounded-md p-1 lg:text-[14px] text-[12px]'
					/>

				</div>
				<div>
					<label className='text-gray-500' htmlFor={message}>Description</label>
					<textarea name={message} onChange={(e) => setMessage(e.target.value)} className="border bg-gray-200 rounded-lg h-[170px] w-full p-2 outline-[#200e32]" placeholder='Description here'>
					</textarea>
				</div>
				<select className="bg-gray-200 p-2" name="" id="" value={churchId} onChange={(e) => setChurchId(e.target.value)}>
					{churches?.map(church => (
						<option key={church.id} value={church.id}>{church.name}</option>
					))}
				</select>
			</div>
		</AddItem>
	)
}

export default AddChurchEvent