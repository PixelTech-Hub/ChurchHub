import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_BASE_URL } from "../../app/api";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Progress } from "flowbite-react";
import { HiAcademicCap, HiHeart, HiHome, HiMail, HiOfficeBuilding, HiPhone, HiUsers, HiClock, HiUser } from "react-icons/hi";

interface Ministry {
	id: string;
	name: string;
	leader: string;
	description: string;
}

interface ChurchMember {
	id: string;
	updatedAt: string
	full_name: string;
	gender: string;
	phone_number: string;
	email: string;
	job: string;
	residence: string;
	age: string;
	marital_status: string;
	no_of_children: string;
	education_level: string | null;
	ministries: Ministry[];
	church: {
		name: string;
	};
}

const SingleChurchMember = () => {
	const { id } = useParams<{ id: string }>();
	const [member, setMember] = useState<ChurchMember | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchMemberDetails();
	}, [id]);

	const fetchMemberDetails = async () => {
		try {
			const response = await axios.get<ChurchMember>(`${API_BASE_URL}/church-members/${id}`);
			setMember(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching member details:', error);
			setIsLoading(false);
		}
	};
	const getAgePercentage = (ageRange: string): number => {
		const parts = ageRange.split('-')
			.map(part => parseInt(part.trim(), 10))
			.filter((num): num is number => !isNaN(num));

		if (parts.length !== 2) {
			// Return a default value if we don't have exactly two valid numbers
			return 50; // You can adjust this default value as needed
		}

		// Use type assertion to tell TypeScript that parts is a tuple of two numbers
		const [min, max] = parts as [number, number];

		return ((min + max) / 2 / 100) * 100;
	};


	const updateMemberField = async (field: keyof ChurchMember, value: string) => {
		try {
			const response = await axios.patch(`${API_BASE_URL}/church-members/${id}`, {
				[field]: value
			});
			if (response.status === 200) {
				setMember(prevMember => prevMember ? { ...prevMember, [field]: value } : null);
			}
		} catch (error) {
			console.error('Error updating member field:', error);
		}
	};

	return (
		<NavbarSidebarLayout>
			<div className="px-4 pt-6 dark:bg-gray-900">
				<Breadcrumb className="mb-4">
					<Breadcrumb.Item href="/">
						<div className="flex items-center gap-x-3">
							<HiHome className="text-xl" />
							<span className="dark:text-white">Home</span>
						</div>
					</Breadcrumb.Item>
					<Breadcrumb.Item href="/users/church-members">Members</Breadcrumb.Item>
					<Breadcrumb.Item>Church Members</Breadcrumb.Item>
				</Breadcrumb>

				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
					</div>
				) : member && (
					<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
						<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white relative">
							
							<h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2">{member.full_name}</h1>
							<p className="lg:text-lg text-sm opacity-80">{member.gender}</p>
						</div>

						<div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
								<InfoItem icon={<HiPhone />} label="Phone" value={`+${member.phone_number}`} field="phone_number" onUpdate={updateMemberField} />
								<InfoItem icon={<HiMail />} label="Email" value={member.email} field="email" onUpdate={updateMemberField} />
								<InfoItem icon={<HiOfficeBuilding />} label="Job" value={member.job} field="job" onUpdate={updateMemberField} />
								<InfoItem icon={<HiHome />} label="Residence" value={member.residence} field="residence" onUpdate={updateMemberField} />
								<InfoItem icon={<HiHeart />} label="Marital Status" value={member.marital_status} field="marital_status" onUpdate={updateMemberField} />
								<InfoItem icon={<HiAcademicCap />} label="Education" value={member.education_level || 'Not specified'} field="education_level" onUpdate={updateMemberField} />
							</div>

							<div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:bg-gray-700 p-6 rounded-lg">
								<h2 className="lg:text-2xl text-xl dark:text-white font-semibold mb-4 flex items-center">
									<HiUsers className="mr-2" color="white"/> Age Group
								</h2>
								<div className="text-center mb-4">
									<span className="dark:text-white lg:text-4xl md:text-3xl text-2xl font-bold">{member.age}</span>
								</div>
								<Progress
									progress={getAgePercentage(member.age)}
									size="lg"
									color="blue"
								/>
							</div>
						</div>

						<div className="bg-gray-50 dark:bg-gray-900 lg:p-8 p-0 pt-8">
							<h2 className="lg:text-2xl text-xl dark:text-white lg:text-start text-center font-semibold mb-6">Ministries</h2>
							{member.ministries.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{member.ministries.map((ministry) => (
									<div key={ministry.id} className="bg-white dark:text-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
										<h3 className="font-bold text-xl mb-2 text-blue-600 dark:text-blue-400">{ministry.name}</h3>
										<p className="text-sm opacity-70 mb-3 flex items-center">
											<HiUser className="mr-2" /> Leader: {ministry.leader}
										</p>
										<p className="text-sm">{ministry.description}</p>
									</div>
								))}
							</div>
							): (
								<>
								<p className="text-yellow-600 text-center pb-6 font-semibold">You are not involed in any ministry</p>
								</>
							)}
						</div>

						<div className="bg-gray-200 dark:bg-gray-700 p-4 text-center">
							<p className="text-sm flex items-center justify-center">
								<HiClock className="mr-2" /> Last updated: {new Date(member.updatedAt).toLocaleDateString()}
							</p>
						</div>
					</div>
				)}
			</div>
		</NavbarSidebarLayout>
	);
};

const InfoItem: React.FC<{
	icon: React.ReactNode;
	label: string;
	value: string;
	field: keyof ChurchMember;
	onUpdate: (field: keyof ChurchMember, value: string) => Promise<void>;
}> = ({ icon, label, value, field, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const handleUpdate = async () => {
		await onUpdate(field, editValue);
		setIsEditing(false);
	};

	return (
		<div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
			<div className="text-blue-500 dark:text-blue-400 text-2xl">{icon}</div>
			<div className="flex-grow">
				<p className="text-sm text-gray-500 dark:text-white">{label}</p>
				{isEditing ? (
					<input
						type="text"
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						className="font-medium lg:text-lg text-[12px] dark:text-gray-300 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
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
					<button onClick={() => setIsEditing(true)} className="text-blue-500">Edit</button>
				)}
			</div>
		</div>
	);
};

export default SingleChurchMember;