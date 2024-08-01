import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Button } from "flowbite-react";
import { HiHome, HiDocumentText, HiLightBulb, HiDownload, HiRefresh } from "react-icons/hi";;
import NavbarSidebarLayout from '../layouts/navbar-sidebar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getChurchMinistryById, updateChurchMinistry } from '../features/church-ministries/ministrySlice';
import { ChurchMinistries } from '../types/ChurchMinistries';
import LoadingSpinner from '../utils/LoadingSpinner';
import UpdateToast from '../utils/UpdateToast';
import LastUpdated from '../utils/LastUpdated';
import StatisticsCard from '../components/church-ministries/StatisticsCard';
import InfoCard from '../components/church-ministries/InfoCard';
import MinistryHeader from '../components/church-ministries/MinistryHeader';
import ErrorMessage from '../utils/ErrorMessage';
import generatePDF from '../utils/generatePDF';
import { EntityChurchAdminRoleEnum } from '../enums/admin.enum';

const SingleChurchMinistry: React.FC = () => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isReloading, setIsReloading] = useState(false);
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { churchMinistry, loading, error } = useAppSelector((state) => state.ministry);

	const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
	const [updateError, setUpdateError] = useState<string | null>(null);
	const churchStaffRole = useAppSelector((state) => state.auth.currentUser?.role)

	useEffect(() => {
		if (id) {
			dispatch(getChurchMinistryById(id));
		}
	}, [dispatch, id ]);



	const handleUpdateMinistry = async (field: keyof ChurchMinistries, value: string) => {
		if (id && churchMinistry) {
			try {
				await dispatch(updateChurchMinistry({ ministryId: id, ministryData: { [field]: value } })).unwrap();
				setUpdateSuccess(true);
				setTimeout(() => setUpdateSuccess(false), 3000);
			} catch (err) {
				setUpdateError("Failed to update. Please try again.");
				setTimeout(() => setUpdateError(null), 3000);
			}
		}
	};

	const handleReload = () => {
		setIsReloading(true);
		if (id) {
			dispatch(getChurchMinistryById(id)).finally(() => {
				setIsReloading(false);
			});
		}
	};

	const handleDownloadPDF = () => {

		if (!churchMinistry) {
			console.error('No ministry data available');
			return;
		}

		try {
			setIsDownloading(true);
			setLoading(true);
			generatePDF({
				columns: [
					{ header: 'Name', accessor: 'name' },
					{ header: 'Description', accessor: 'description' },
				],
				data: [churchMinistry], // Wrap churchMinistry in an array
				filename: `${churchMinistry.name}.pdf`
			});
			setLoading(false)
			setIsDownloading(false)
		} catch (error) {
			console.error('Error generating PDF:', error);
			setIsDownloading(false);
			setLoading(false);
			// Optionally, you can set an error state here to display to the user
			setUpdateError("Failed to generate PDF. Please try again.");
		}
	};

	const canAccessUpdateMinistryModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
		EntityChurchAdminRoleEnum.editor
	].includes(churchStaffRole as EntityChurchAdminRoleEnum);

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

				<div className="flex items-center justify-end mb-4 gap-4">
					<Button
						color="light"
						onClick={handleReload}
						className={` transition-transform duration-300 ${isReloading ? '' : 'hover:bg-gray-800 '
							}`}
					>
						<HiRefresh className={`mr-2 h-5 w-5 ${isReloading ? 'opacity-0' : ''}`} />
						<span className={isReloading ? 'opacity-0' : ''}>Reload</span>
						{isReloading && (
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full "></div>
							</div>
						)}
					</Button>
					<Button
						color="light"
						onClick={handleDownloadPDF}
						disabled={isDownloading}
						className={`transition-transform duration-300 ${isDownloading ? '' : ''
							}`}
					>
						<HiDownload className={`mr-2 h-5 w-5 ${isDownloading ? 'opacity-0' : ''}`} />
						<span className={isDownloading && isLoading ? 'opacity-0' : ''}>{isDownloading && isLoading ?
							'Downloading...' : 'Download'
						}</span>
						{isDownloading && isLoading && (
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full animate-spin"></div>
							</div>
						)}
					</Button>
				</div>

				{loading && <LoadingSpinner />}
				{error && <ErrorMessage message={error} />}
				{!loading && !error && churchMinistry && (
					<div className="space-y-6">
						<MinistryHeader ministry={churchMinistry} />
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<InfoCard
								icon={<HiDocumentText className="text-3xl text-blue-500" />}
								label="Name"
								value={churchMinistry.name}
								field="name"
								onUpdate={handleUpdateMinistry}
								inputType="text"
								canAccessUpdateMinistryModal={canAccessUpdateMinistryModal}
							/>
							<InfoCard
								icon={<HiLightBulb className="text-3xl text-yellow-500" />}
								label="Description"
								value={churchMinistry.description}
								field="description"
								onUpdate={handleUpdateMinistry}
								inputType="textarea"
								canAccessUpdateMinistryModal={canAccessUpdateMinistryModal}
							/>
							<StatisticsCard ministry={churchMinistry} />
						</div>
						<LastUpdated date={churchMinistry.updatedAt} />
					</div>
				)}

				<UpdateToast success={updateSuccess} error={updateError} />
			</div>
		</NavbarSidebarLayout>
	);
};


export default SingleChurchMinistry;