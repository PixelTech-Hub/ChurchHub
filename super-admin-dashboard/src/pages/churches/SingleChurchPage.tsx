import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Churches } from '../../types/Churches';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import { Breadcrumb, Card, Button, Timeline, Toast, Avatar } from 'flowbite-react';
import { HiHome, HiMail, HiGlobe, HiPhone, HiEye, HiLightBulb, HiHeart, HiCheck, HiX } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { Switch } from '@headlessui/react';
import { FaUserCircle } from 'react-icons/fa';
import UpdateChurch from '../../components/churches/UpdateChurch';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleChurch, updateChurch } from '../../features/churches/churchSlice';

const SingleChurchPage = () => {
	const [isToggling, setIsToggling] = useState(false);
	const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

// Use setToastMessage in your functions to show messages

	const { id: churchId } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { singleChurch: church, loading, error } = useAppSelector((state) => state.church);

	useEffect(() => {
		if (churchId) {
			dispatch(getSingleChurch(churchId));
		}
	}, [dispatch, churchId]);

	const updateChurchField = async (field: keyof Churches, value: string | number) => {
		if (churchId) {
			try {
				await dispatch(updateChurch({ id: churchId, churchData: { [field]: value } })).unwrap();
				// Handle success (you might want to show a toast message here)
			} catch (error) {
				console.error('Error updating church field:', error);
				// Handle error (show error toast message)
			}
		}
	};

	if (loading) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	if (error) {
		return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
	}

	if (!church) {
		return <div className="flex justify-center items-center h-screen">Church not found</div>;
	}

	const toggleChurchStatus = async () => {
		if (!church || loading) return;

		try {
			const newStatus = !church.isEnabled;
			await dispatch(updateChurch({ id: churchId!, churchData: { isEnabled: newStatus } })).unwrap();
			// Handle success (show success toast message)
		} catch (error) {
			console.error('Error updating church status:', error);
			// Handle error (show error toast message)
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
					<h2 className="text-2xl font-bold">{church.name}</h2>
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
												onUpdate={(field, value) => updateChurchField(field as keyof Churches, value)}
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