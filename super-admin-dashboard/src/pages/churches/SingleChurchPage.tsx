import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Churches } from '../../types/Churches';
import axios from 'axios';
import { CHURCH_API_URL } from '../../app/api';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import { Breadcrumb, Card, Button, Timeline, Toast, Table, Avatar } from 'flowbite-react';
import { HiHome, HiMail, HiGlobe, HiPhone, HiEye, HiLightBulb, HiHeart, HiCheck, HiX } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { Switch } from '@headlessui/react';
import { FaUserCircle } from 'react-icons/fa';
import UpdateChurch from '../../components/churches/UpdateChurch';

const SingleChurchPage = () => {
	const { id: churchId } = useParams<{ id: string }>();
	const [church, setChurch] = useState<Churches | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isToggling, setIsToggling] = useState(false);
	const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

	useEffect(() => {
		fetchChurchDetails();
	}, [churchId]);

	const fetchChurchDetails = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get<Churches>(`${CHURCH_API_URL}/${churchId}`);
			setChurch(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching church details:', error);
			setToastMessage({ type: 'error', message: 'Failed to fetch church details' });
			setIsLoading(false);
		}
	};

	const updateChurchField = async (field: keyof Churches, value: string | number) => {
		try {
		  const response = await axios.patch(`${CHURCH_API_URL}/${churchId}`, {
			[field]: value
		  });
		  if (response.status === 200) {
			setChurch(prevChurch => prevChurch ? { ...prevChurch, [field]: value } : null);
			setToastMessage({ type: 'success', message: `${field} updated successfully` });
		  }
		} catch (error) {
		  console.error('Error updating church field:', error);
		  setToastMessage({ type: 'error', message: `Failed to update ${field}` });
		}
	  };

	if (isLoading) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	if (!church) {
		return <div className="flex justify-center items-center h-screen">Church not found</div>;
	}

	const toggleChurchStatus = async () => {
		if (!church || isToggling) return;

		setIsToggling(true);
		try {
			const newStatus = !church.isEnabled;
			const response = await axios.patch(`${CHURCH_API_URL}/${churchId}`, { isEnabled: newStatus });

			if (response.status === 200) {
				setChurch(prevChurch => prevChurch ? { ...prevChurch, isEnabled: newStatus } : null);
				setToastMessage({
					type: 'success',
					message: `Church status ${newStatus ? 'enabled' : 'disabled'} successfully`
				});
			} else {
				throw new Error('Failed to update church status');
			}
		} catch (error) {
			console.error('Error updating church status:', error);
			setToastMessage({ type: 'error', message: 'Failed to update church status' });
		} finally {
			setIsToggling(false);
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
					<Breadcrumb.Item href="/churches">Churches</Breadcrumb.Item>
					<Breadcrumb.Item>{church.name}</Breadcrumb.Item>
				</Breadcrumb>

				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-bold">Church Status</h2>
					<Switch
						checked={church.isEnabled}
						onChange={toggleChurchStatus}
						className={`${church.isEnabled ? 'bg-green-600' : 'bg-red-500'
							} relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
						disabled={isToggling}
					>
						<span className="sr-only">Enable church</span>
						<span
							className={`${church.isEnabled ? 'translate-x-7' : 'translate-x-1'
								} inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isToggling ? 'opacity-50' : ''
								}`}
						/>
					</Switch>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-2">
						<div className="flex items-center mb-4 gap-4">
							{church?.churchLogo ? (
								<img
									src={church.churchLogo}
									alt={`${church.name} logo`}
									className="w-16 h-16 mr-4 object-contain"
								/>
							) : (
								<Avatar
									alt="User settings"
									img={FaUserCircle}
									rounded
									size="xl"
									placeholderInitials="NS"

								/>
							)}
							<div>
								<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{church.name}
								</h5>
								<p className="font-normal text-gray-700 dark:text-gray-400">
									Welcome to {church.name}, a place of worship and community.
								</p>
							</div>
						</div>
						<div className="mt-4">
							<Timeline>
								<Timeline.Item>
									<Timeline.Point icon={HiEye} />
									<Timeline.Content>
										<Timeline.Title>Our Vision</Timeline.Title>
										<Timeline.Body>
											<UpdateChurch
												fieldName="vision"
												value={church.vision}
												onUpdate={updateChurchField}
											/>
										</Timeline.Body>
									</Timeline.Content>
								</Timeline.Item>
								<Timeline.Item>
									<Timeline.Point icon={HiLightBulb} />
									<Timeline.Content>
										<Timeline.Title>Our Mission</Timeline.Title>
										<Timeline.Body>
											<UpdateChurch
												fieldName="mission"
												value={church.mission ?? ''}
												onUpdate={updateChurchField}
											/>
										</Timeline.Body>
									</Timeline.Content>
								</Timeline.Item>
								<Timeline.Item>
									<Timeline.Point icon={HiHeart} />
									<Timeline.Content>
										<Timeline.Title>Core Values</Timeline.Title>
										<Timeline.Body>
											<UpdateChurch
												fieldName="core_values"
												value={church.core_values}
												onUpdate={updateChurchField}
											/>
										</Timeline.Body>
									</Timeline.Content>
								</Timeline.Item>
							</Timeline>
						</div>
					</Card>

					<Card>
						<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 m">
							Contact Information
						</h5>
						<div className="space-y-4">
							<div className="flex items-center">
								<HiMail className="mr-2 h-5 w-5" />
								<UpdateChurch
									fieldName="email"
									value={church.email ?? ''}
									onUpdate={updateChurchField}
								/>
							</div>
							<div className="flex items-center">
								<HiGlobe className="mr-2 h-5 w-5" />
								<UpdateChurch
									fieldName="website"
									value={church.website}
									onUpdate={updateChurchField}
								/>
							</div>
							<div className="flex items-center">
								<HiPhone className="mr-2 h-5 w-5" />
								<UpdateChurch
									fieldName="office_no"
									value={church.office_no}
									onUpdate={updateChurchField}
								/>
							</div>
						</div>
						<div className="mt-6">
							<Button color="light" className="w-full">
								<MdEdit className="mr-2 h-5 w-5" />
								Edit Church Information
							</Button>
						</div>
					</Card>
				</div>


			</div>
			{toastMessage && (
				<Toast className="fixed bottom-5 right-5">
					<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
						{toastMessage.type === 'success' ? (
							<HiCheck className="h-5 w-5" />
						) : (
							<HiX className="h-5 w-5" />
						)}
					</div>
					<div className="ml-3 text-sm font-normal">{toastMessage.message}</div>
					<Toast.Toggle onDismiss={() => setToastMessage(null)} />
				</Toast>
			)}

			{/* </div> */}
		</NavbarSidebarLayout >
	);
};

export default SingleChurchPage;