import { useParams } from 'react-router';
import { ChurchMinistries } from '../types/ChurchMinistries';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../app/api';
import { Breadcrumb } from "flowbite-react";
import { HiHome, HiUsers, HiClock, HiDocumentText, HiOutlineDocumentText } from "react-icons/hi";
import NavbarSidebarLayout from '../layouts/navbar-sidebar';
import { MdEdit } from 'react-icons/md';

const SingleChurchMinistry = () => {
	const { id } = useParams<{ id: string }>();
	const [ministry, setMinistry] = useState<ChurchMinistries | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchMinistryDetails();
	}, [id]);

	const fetchMinistryDetails = async () => {
		try {
			const response = await axios.get<ChurchMinistries>(`${API_BASE_URL}/church_ministries/${id}`);
			setMinistry(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching ministry details:', error);
			setIsLoading(false);
		}
	};

	const updateMinistryField = async (field: keyof ChurchMinistries, value: string) => {
		try {
			const response = await axios.patch(`${API_BASE_URL}/church_ministries/${id}`, {
				[field]: value
			});
			if (response.status === 200) {
				setMinistry(prevMember => prevMember ? { ...prevMember, [field]: value } : null);
			}
		} catch (error) {
			console.error('Error updating member field:', error);
		}
	};

	console.log('Fetch ministry details', ministry)
	return (
		<NavbarSidebarLayout>
			<div className="px-4 lg:pt-6 pt-14 dark:bg-gray-900">
				<Breadcrumb className="mb-4">
					<Breadcrumb.Item href="#">
						<div className="flex items-center gap-x-3">
							<HiHome className="text-xl" />
							<span className="dark:text-white lg:text-base text-sm">Home</span>
						</div>
					</Breadcrumb.Item>
					<Breadcrumb.Item href="#" >
						<p className='lg:text-base text-[10px]'>Church Initiatives</p>
					</Breadcrumb.Item>
					<Breadcrumb.Item href='/church-ministries'>
					<p className='lg:text-base text-[10px]'>Church Ministries</p>
					</Breadcrumb.Item>
				</Breadcrumb>

				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
					</div>
				) : ministry && (
					<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
						<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white relative">
							<div className="absolute top-0 right-0 m-4">
							</div>
							<h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2">{ministry.name}</h1>

							<p className="lg:text-xl text-sm opacity-80 font-bold">{ministry.leader}</p>
						</div>

						<div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
								<InfoItem
									icon={<HiDocumentText />}
									label="Name"
									value={ministry.name}
									field="name"
									onUpdate={updateMinistryField}
								/>
								<InfoItem
									icon={<HiUsers />}
									label="Leader"
									value={ministry.leader}
									field="leader"
									onUpdate={updateMinistryField}
								/>
								<InfoItem
									icon={<HiOutlineDocumentText />}
									label="Description"
									value={ministry.description}
									field="description"
									onUpdate={updateMinistryField}
								/>


							</div>


						</div>



						<div className="bg-gray-200 dark:bg-gray-700 p-4 text-center">
							<p className="text-sm flex items-center justify-center">
								<HiClock className="mr-2" /> Last updated: {new Date(ministry.updatedAt).toLocaleDateString()}
							</p>
						</div>
					</div>
				)}
			</div>
		</NavbarSidebarLayout>
	)
}

const InfoItem: React.FC<{
	icon: React.ReactNode;
	label: string;
	value: string;
	field: keyof ChurchMinistries;
	onUpdate: (field: keyof ChurchMinistries, value: string) => Promise<void>;
}> = ({ icon, label, value, field, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const handleUpdate = async () => {
		await onUpdate(field, editValue);
		setIsEditing(false);
	};

	return (
		<div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
			<div className="text-blue-500 dark:text-blue-400 lg:text-2xl text-xl">{icon}</div>
			<div className="flex-grow">
				<p className="lg:text-sm text-[12px] text-gray-500 dark:text-white">{label}</p>
				{isEditing ? (
					<textarea
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						className="font-medium rounded-md lg:text-lg text-[14px] dark:text-gray-300 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
					/>
				) : (
					<p className="font-medium lg:text-lg text-[12px] dark:text-gray-300">{value}</p>
				)}
			</div>
			<div>
				{isEditing ? (
					<>
						<button onClick={handleUpdate} className="text-green-500 mr-2">Save</button>
						<button onClick={() => setIsEditing(false)} className="text-red-500">Cancel</button>
					</>
				) : (
					<button onClick={() => setIsEditing(true)} className="text-blue-500">
						<MdEdit color='green'/>
					</button>
				)}
			</div>
		</div>
	);
};

export default SingleChurchMinistry