import { FC } from "react"
import { Button, Pagination, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi"
import { Churches } from "../../types/Churches";
import { CHURCH_API_URL } from "../../app/api";
import { Switch } from '@headlessui/react';

interface ChurchTableProps {
	paginatedChurches: Churches[];
	filteredChurches: Churches[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	fetchChurches: () => void;
}

const ChurchesTable: FC<ChurchTableProps> = ({ paginatedChurches, filteredChurches, loading, currentPage, setCurrentPage, totalPages, fetchChurches }) => {

	if (loading) {
		<p>Loading....</p>
	}
	if (filteredChurches.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-red-500 dark:text-gray-400">No Church Found</p>
			</div>
		);
	}
	const toggleChurchStatus = async (churchId: string, currentStatus: boolean) => {
		try {
			const response = await fetch(`${CHURCH_API_URL}/${churchId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ isEnabled: !currentStatus }),
			});

			if (!response.ok) {
				throw new Error('Failed to update church status');
			}

			// Refresh the churches data after successful update
			// You might need to lift this state up to the parent component
			// and pass it down as a prop if fetchChurches is not accessible here
			fetchChurches();
		} catch (error) {
			console.error('Error updating church status:', error);
			// You might want to show an error message to the user here
		}
	};

	return (
		<>
			<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Contact</Table.HeadCell>
					<Table.HeadCell>Website</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{paginatedChurches.map(church => (
						<Table.Row key={church.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

							<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								<div className="text-base font-semibold text-gray-900 dark:text-white">
									{church.name}
								</div>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{church.email}
							</Table.Cell>

							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
								{church.office_no}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{church.website}
							</Table.Cell>

							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">
									<Switch
										checked={church.isEnabled}
										onChange={() => toggleChurchStatus(church.id ?? '', church.isEnabled ?? false)}
										className={`${church.isEnabled ? 'bg-green-600' : 'bg-red-500'
											} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
									>
										<span className="sr-only">Enable church</span>
										<span
											className={`${church.isEnabled ? 'translate-x-6' : 'translate-x-1'
												} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
										/>
									</Switch>
									{/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
										{church.isEnabled ? (
											<HiLightningBolt className="text-yellow-400 h-5 w-5" />
										) : (
											<HiMoon className="text-indigo-400 h-5 w-5" />
										)}
									</span> */}
									{/* <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
										{church.isEnabled ? 'Active' : 'Inactive'}
									</span> */}
									{/* <DeleteChurchModal
										churchId={church.id ?? ''}
										churchName={church.name ?? ''}
									/> */}
									<Link to={`${CHURCH_API_URL}/${church.id}`} className="">
										<Button color="success">
											<HiArrowRight className="mr-2 text-lg" />
										</Button>
									</Link>
								</div>
							</Table.Cell>
						</Table.Row>
					))}

				</Table.Body>
			</Table>
			<div className="flex overflow-x-auto sm:justify-center">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					showIcons={true}
				/>
			</div>
		</>
	)
}

export default ChurchesTable