import { FC } from 'react'
import { ChurchMinistries } from '../../types/ChurchMinistries';
import { Button, Pagination, Table } from 'flowbite-react';
import DeleteChurchMinistryModal from './DeleteChurchMinistryModal';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { truncateText } from '../../helpers/truncateText';
// import { truncateText } from '../../helpers/truncateText';


interface ChurchMinistryTableProps {
	paginatedMinistries: ChurchMinistries[];
	filteredMinistries: ChurchMinistries[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}


const ChurchMinistriesTable: FC<ChurchMinistryTableProps> = ({ currentPage, filteredMinistries, loading, paginatedMinistries, setCurrentPage, totalPages }) => {
	

	if (loading) {
		<p>Loading....</p>
	}
	if (filteredMinistries.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-red-500 dark:text-gray-400">No Church Ministry Found</p>
			</div>
		);
	}

	// console.log('filteredMinistries', filteredMinistries)

	return (
		<>
			<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Description</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{paginatedMinistries.map(ministry => (
						<Table.Row key={ministry.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

							<Table.Cell className="whitespace-nowrap p-4 font-normal text-gray-500 dark:text-gray-400">
								<div className="lg:text-base text-sm font-semibold text-gray-900 dark:text-white">
									{ministry.name}
								</div>
							</Table.Cell>

							<Table.Cell className="whitespace-nowrap p-4 lg:text-base text-sm font-medium text-gray-900 dark:text-white capitalize truncate">
								{truncateText(ministry.description, 40)}
							</Table.Cell>
							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">

									<DeleteChurchMinistryModal
										ministryId={ministry.id ?? ''}
										name={ministry.name}
									/>
									<Link to={`/church-ministries/${ministry.id}`} className="">
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

export default ChurchMinistriesTable