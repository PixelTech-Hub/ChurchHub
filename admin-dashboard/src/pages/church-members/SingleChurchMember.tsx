import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_BASE_URL } from "../../app/api";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Badge, Progress } from "flowbite-react";
import { HiAcademicCap, HiHeart, HiHome, HiMail, HiOfficeBuilding, HiPhone, HiUsers, HiCalendar, HiClock } from "react-icons/hi";

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
							<div className="absolute top-0 right-0 m-4">
								<Badge color="success" size="xl">{member.gender}</Badge>
							</div>
							<h1 className="text-4xl font-bold mb-2">{member.full_name}</h1>
							{/* <p className="text-xl opacity-80">{member.church.name}</p> */}
						</div>

						<div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
								<InfoItem icon={<HiPhone />} label="Phone" value={member.phone_number} />
								<InfoItem icon={<HiMail />} label="Email" value={member.email} />
								<InfoItem icon={<HiOfficeBuilding />} label="Job" value={member.job} />
								<InfoItem icon={<HiHome />} label="Residence" value={member.residence} />
								<InfoItem icon={<HiHeart />} label="Marital Status" value={member.marital_status} />
								<InfoItem icon={<HiAcademicCap />} label="Education" value={member.education_level || 'Not specified'} />
							</div>

							<div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
								<h2 className="text-2xl font-semibold mb-4 flex items-center">
									<HiUsers className="mr-2" /> Age Group
								</h2>
								<div className="text-center mb-4">
									<span className="text-4xl font-bold">{member.age}</span>
								</div>
								<Progress
									progress={getAgePercentage(member.age)}
									size="lg"
									color="blue"
								/>
							</div>
						</div>

						<div className="bg-gray-50 dark:bg-gray-900 p-8">
							<h2 className="text-2xl font-semibold mb-6">Ministries</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{member.ministries.map((ministry) => (
									<div key={ministry.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
										<h3 className="font-bold text-xl mb-2 text-blue-600 dark:text-blue-400">{ministry.name}</h3>
										<p className="text-sm opacity-70 mb-3 flex items-center">
											<HiCalendar className="mr-2" /> Leader: {ministry.leader}
										</p>
										<p className="text-sm">{ministry.description}</p>
									</div>
								))}
							</div>
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

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
	<div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
		<div className="text-blue-500 dark:text-blue-400 text-2xl">{icon}</div>
		<div>
			<p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
			<p className="font-medium text-lg">{value}</p>
		</div>
	</div>
);

export default SingleChurchMember;