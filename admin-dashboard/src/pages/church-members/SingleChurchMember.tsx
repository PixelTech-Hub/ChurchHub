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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChurchMemberById } from "../../features/church-members/memberSlice";
import { ChurchMembers } from "../../types/ChurchMember";
import { ChurchMinistries } from "../../types/ChurchMinistries";

const SingleChurchMember = () => {
	const [isDownloading, setIsDownloading] = useState(false);
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { churchMember, loading, error } = useAppSelector((state) => state.member);

	useEffect(() => {
		if (id) {
			dispatch(getChurchMemberById(id));
		}
	}, [dispatch, id]);

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
					if (!/^\S+@\S+\.\S+$/.test(value)) {
						throw new Error('Invalid email format');
					}
					break;
				case 'phone_number':
					if (!/^\+?[0-9]{10,14}$/.test(value)) {
						throw new Error('Invalid phone number format');
					}
					break;
			}

			const response = await axios.patch(`${API_BASE_URL}/church-members/${id}`, {
				[field]: validatedValue
			});

			if (response.status === 200) {
				dispatch(getChurchMemberById(id!)); // Refresh data after update
				toast.success(`${field.replace('_', ' ')} updated successfully!`);
			}
		} catch (error) {
			console.error('Error updating member field:', error);
			toast.error(`Failed to update ${field.replace('_', ' ')}. Please try again.`);
		}
	};

	const handleDownloadPDF = async () => {
		if (!churchMember) return;

		setIsDownloading(true);
		try {
			const doc = new jsPDF();

			doc.setFontSize(20);
			doc.text(churchMember.full_name, 105, 15, { align: 'center' });

			doc.setFontSize(12);
			doc.text(`Gender: ${churchMember.gender}`, 20, 30);
			doc.text(`Phone: +${churchMember.phone_number}`, 20, 40);
			doc.text(`Email: ${churchMember.email}`, 20, 50);
			doc.text(`Job: ${churchMember.job}`, 20, 60);
			doc.text(`Residence: ${churchMember.residence}`, 20, 70);
			doc.text(`Marital Status: ${churchMember.marital_status}`, 20, 80);
			doc.text(`Education: ${churchMember.education_level || 'Not specified'}`, 20, 90);
			doc.text(`Age Group: ${churchMember.age}`, 20, 100);
			doc.text(`Number of Children: ${churchMember.no_of_children}`, 20, 110);

			if (churchMember.ministries && churchMember.ministries.length > 0) {
				doc.text('Ministries', 20, 130);
				const ministriesData = churchMember.ministries.map((ministry: ChurchMinistries) => [
					ministry.name,
					ministry.description
				]);

				(doc as any).autoTable({
					head: [['Name', 'Description']],
					body: ministriesData,
					startY: 135,
				});
			}



			// Handle the case where updatedAt might be undefined
			const lastUpdated = churchMember.updatedAt
				? new Date(churchMember.updatedAt).toLocaleDateString()
				: 'Not available';

			doc.text(`Last updated: ${lastUpdated}`, 20, doc.internal.pageSize.height - 10);
			doc.save(`${churchMember.full_name}_details.pdf`);
			toast.success('PDF downloaded successfully!');
		} catch (error) {
			console.error('Error generating PDF:', error);
			toast.error('Failed to generate PDF. Please try again.');
		} finally {
			setIsDownloading(false);
		}
	};

	if (loading) {
		return (
			<NavbarSidebarLayout>
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
				</div>
			</NavbarSidebarLayout>
		);
	}

	if (error) {
		return (
			<NavbarSidebarLayout>
				<div className="text-center text-red-500">
					Error loading church member data. Please try again later.
				</div>
			</NavbarSidebarLayout>
		);
	}

	if (!churchMember) {
		return (
			<NavbarSidebarLayout>
				<div className="text-center">
					No church member data found.
				</div>
			</NavbarSidebarLayout>
		);
	}

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
					className={`absolute top-4 right-4 transition-transform duration-300 ${isDownloading ? '' : 'hover:scale-110'}`}
				>
					<HiDownload className={`mr-2 h-5 w-5 ${isDownloading ? 'opacity-0' : ''}`} />
					<span className={isDownloading ? 'opacity-0' : ''}>Download PDF</span>
					{isDownloading && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full animate-spin"></div>
						</div>
					)}
				</Button>

				<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white relative">
						<h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2">{churchMember.full_name}</h1>
						<p className="lg:text-lg text-sm opacity-80">{churchMember.gender}</p>
					</div>

					<div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
							<ChurchMemberInfoItem icon={<HiPhone />} label="Phone" value={`+${churchMember.phone_number}`} field="phone_number" onUpdate={updateMemberField} />
							<ChurchMemberInfoItem icon={<HiMail />} label="Email" value={churchMember.email} field="email" onUpdate={updateMemberField} />
							<ChurchMemberInfoItem icon={<HiOfficeBuilding />} label="Job" value={churchMember.job} field="job" onUpdate={updateMemberField} />
							<ChurchMemberInfoItem icon={<HiHome />} label="Residence" value={churchMember.residence} field="residence" onUpdate={updateMemberField} />
							<ChurchMemberInfoItem icon={<HiHeart />} label="Marital Status" value={churchMember.marital_status} field="marital_status" onUpdate={updateMemberField} />
							<ChurchMemberInfoItem icon={<HiAcademicCap />} label="Education" value={churchMember.education_level || 'Not specified'} field="education_level" onUpdate={updateMemberField} />
							<ChurchMemberInfoItem icon={<HiUsers />} label="Number of Children" value={churchMember.no_of_children} field="no_of_children" onUpdate={updateMemberField} />
						</div>

						<div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:bg-gray-700 p-6 rounded-lg">
							<h2 className="lg:text-2xl text-xl dark:text-white font-semibold mb-4 flex items-center">
								<HiUsers className="mr-2" color="white" /> Age Group
							</h2>
							<div className="text-center mb-4">
								<span className="dark:text-white lg:text-4xl md:text-3xl text-2xl font-bold">{churchMember.age}</span>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 dark:bg-gray-900 lg:p-8 p-0 pt-8">
						<h2 className="lg:text-2xl text-xl dark:text-white lg:text-start text-center font-semibold mb-6">Ministries</h2>
						<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{churchMember.ministries && churchMember.ministries.length > 0 ? (
								churchMember.ministries.map(ministry => (
									<div key={ministry.id} className="bg-white dark:text-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
										<h3 className="font-bold text-xl mb-2 text-blue-600 dark:text-blue-400">{ministry.name}</h3>
										<p className="text-sm">{ministry.description}</p>
									</div>
								))
							) : (
								<div className="col-span-3 text-center text-gray-500">
									No ministries found for this member.
								</div>
							)}
						</div>
					</div>

					<div className="bg-gray-200 dark:bg-gray-700 p-4 text-center">
						<p className="text-sm flex items-center justify-center">
							<HiClock className="mr-2" />
							Last updated: {churchMember.updatedAt
								? new Date(churchMember.updatedAt).toLocaleDateString()
								: 'Not available'}
						</p>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
	);
};

export default SingleChurchMember;