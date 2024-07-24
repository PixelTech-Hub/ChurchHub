import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_BASE_URL } from "../../app/api";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button } from "flowbite-react";
import { HiAcademicCap, HiHeart, HiHome, HiMail, HiOfficeBuilding, HiPhone, HiUsers, HiClock, HiDownload } from "react-icons/hi";
import { EntityAgeEnum } from "../../enums/entity-age.enum";
import { EntityGenderEnum } from "../../enums/entity-gender.enum";
import { EntityMaritalStatusEnum } from "../../enums/entity-maritalstatus.enum";
import { EntityEducationalLevelEnum } from "../../enums/entity-education.enum";
import { toast } from "react-toastify";
import ChurchMemberInfoItem from "../../components/church-members/ChurchMemberInfoItem";
import { ChurchMembers } from "../../types/ChurchMember";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SingleChurchMember = () => {
	const { id } = useParams<{ id: string }>();
	const [member, setMember] = useState<ChurchMembers | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		fetchMemberDetails();
	}, [id]);

	const fetchMemberDetails = async () => {
		try {
			const response = await axios.get<ChurchMembers>(`${API_BASE_URL}/church-members/${id}`);
			setMember(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching member details:', error);
			setIsLoading(false);
		}
	};

	const updateMemberField = async (field: keyof ChurchMembers, value: string) => {
		try {
			let validatedValue: string | EntityAgeEnum | EntityGenderEnum | EntityMaritalStatusEnum | EntityEducationalLevelEnum = value;

			switch (field) {
				case 'gender':
					if (!Object.values(EntityGenderEnum).includes(value as EntityGenderEnum)) {
						throw new Error('Invalid gender value');
					}
					validatedValue = value as EntityGenderEnum;
					break;
				case 'age':
					if (!Object.values(EntityAgeEnum).includes(value as EntityAgeEnum)) {
						throw new Error('Invalid age range');
					}
					validatedValue = value as EntityAgeEnum;
					break;
				case 'marital_status':
					if (!Object.values(EntityMaritalStatusEnum).includes(value as EntityMaritalStatusEnum)) {
						throw new Error('Invalid marital status');
					}
					validatedValue = value as EntityMaritalStatusEnum;
					break;
				case 'education_level':
					if (!Object.values(EntityEducationalLevelEnum).includes(value as EntityEducationalLevelEnum)) {
						throw new Error('Invalid education level');
					}
					validatedValue = value as EntityEducationalLevelEnum;
					break;
				case 'email':
					// Simple email validation
					if (!/^\S+@\S+\.\S+$/.test(value)) {
						throw new Error('Invalid email format');
					}
					break;
				case 'phone_number':
					// Simple phone number validation (you might want to use a library for more robust validation)
					if (!/^\+?[0-9]{10,14}$/.test(value)) {
						throw new Error('Invalid phone number format');
					}
					break;
				// Add other field-specific validations as needed
			}

			const response = await axios.patch(`${API_BASE_URL}/church-members/${id}`, {
				[field]: validatedValue
			});

			if (response.status === 200) {
				setMember(prevMember => prevMember ? { ...prevMember, [field]: validatedValue } : null);
				toast.success(`${field.replace('_', ' ')} updated successfully!`);
			}
		} catch (error) {
			console.error('Error updating member field:', error);
			toast.error(`Failed to update ${field.replace('_', ' ')}. Please try again.`);
			// You might want to show an error message to the user here
		}
	};

	const handleDownloadPDF = async () => {
		if (!member) return;

		setIsDownloading(true);
		try {
			const doc = new jsPDF();

			// Add member name as title
			doc.setFontSize(20);
			doc.text(member.full_name, 105, 15, { align: 'center' });

			// Add member details
			doc.setFontSize(12);
			doc.text(`Gender: ${member.gender}`, 20, 30);
			doc.text(`Phone: +${member.phone_number}`, 20, 40);
			doc.text(`Email: ${member.email}`, 20, 50);
			doc.text(`Job: ${member.job}`, 20, 60);
			doc.text(`Residence: ${member.residence}`, 20, 70);
			doc.text(`Marital Status: ${member.marital_status}`, 20, 80);
			doc.text(`Education: ${member.education_level || 'Not specified'}`, 20, 90);
			doc.text(`Age Group: ${member.age}`, 20, 100);

			// Add ministries table
			doc.text('Ministries', 20, 120);
			const ministriesData = member.ministries.map(ministry => [
				ministry.name,
				ministry.description
			]);

			(doc as any).autoTable({
				head: [['Name', 'Leader', 'Description']],
				body: ministriesData,
				startY: 125,
			});

			// Add last updated info
			const lastUpdated = new Date(member.updatedAt).toLocaleDateString();
			doc.text(`Last updated: ${lastUpdated}`, 20, doc.internal.pageSize.height - 10);

			doc.save(`${member.full_name}_details.pdf`);
			toast.success('PDF downloaded successfully!');
		} catch (error) {
			console.error('Error generating PDF:', error);
			toast.error('Failed to generate PDF. Please try again.');
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<NavbarSidebarLayout>
			<div className="px-4 pt-6 dark:bg-gray-900">
				<Breadcrumb className="mb-10">
					<Breadcrumb.Item href="/">
						<div className="flex items-center gap-x-3">
							<HiHome className="text-xl" />
							<span className="dark:text-white">Home</span>
						</div>
					</Breadcrumb.Item>
					<Breadcrumb.Item href="/users/church-members">Members</Breadcrumb.Item>
					<Breadcrumb.Item>Church Members</Breadcrumb.Item>
				</Breadcrumb>
				<Button
					color="light"
					onClick={handleDownloadPDF}
					disabled={isDownloading}
					className={`absolute top-4 right-4 transition-transform duration-300 ${isDownloading ? '' : 'hover:scale-110'
						}`}
				>
					<HiDownload className={`mr-2 h-5 w-5 ${isDownloading ? 'opacity-0' : ''}`} />
					<span className={isDownloading ? 'opacity-0' : ''}>Download PDF</span>
					{isDownloading && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full animate-spin"></div>
						</div>
					)}
				</Button>

				{isLoading ? (
					<div className="flex justify-center items-center h-64 ">
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
								<ChurchMemberInfoItem icon={<HiPhone />} label="Phone" value={`+${member.phone_number}`} field="phone_number" onUpdate={updateMemberField} />
								<ChurchMemberInfoItem icon={<HiMail />} label="Email" value={member.email} field="email" onUpdate={updateMemberField} />
								<ChurchMemberInfoItem icon={<HiOfficeBuilding />} label="Job" value={member.job} field="job" onUpdate={updateMemberField} />
								<ChurchMemberInfoItem icon={<HiHome />} label="Residence" value={member.residence} field="residence" onUpdate={updateMemberField} />
								<ChurchMemberInfoItem icon={<HiHeart />} label="Marital Status" value={member.marital_status} field="marital_status" onUpdate={updateMemberField} />
								<ChurchMemberInfoItem icon={<HiAcademicCap />} label="Education" value={member.education_level || 'Not specified'} field="education_level" onUpdate={updateMemberField} />
							</div>

							<div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:bg-gray-700 p-6 rounded-lg">
								<h2 className="lg:text-2xl text-xl dark:text-white font-semibold mb-4 flex items-center">
									<HiUsers className="mr-2" color="white" /> Age Group
								</h2>
								<div className="text-center mb-4">
									<span className="dark:text-white lg:text-4xl md:text-3xl text-2xl font-bold">{member.age}</span>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 dark:bg-gray-900 lg:p-8 p-0 pt-8">
							<h2 className="lg:text-2xl text-xl dark:text-white lg:text-start text-center font-semibold mb-6">Ministries</h2>
							<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{member.ministries.map(ministry => (
									<div key={ministry.id} className="bg-white dark:text-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
										<h3 className="font-bold text-xl mb-2 text-blue-600 dark:text-blue-400">{ministry.name}</h3>
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

export default SingleChurchMember;
