import { FC } from "react"
import { ChurchServices } from "../../types/ChurchServices";
import { Button, Pagination, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import DeleteChurchServiceModal from "./DeleteChurchServiceModal";
import UpdateChurchServiceModal from "./UpdateChurchServiceModal";

interface ChurchServiceTableProps {
	filteredServices: ChurchServices[];
	paginatedServices: ChurchServices[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}

const ChurchServiceTable: FC<ChurchServiceTableProps> = ({
	currentPage,
	paginatedServices,
	loading,
	filteredServices,
	setCurrentPage,
	totalPages
}) => {

	if (loading) {
		<p>Loading....</p>
	}
	if (filteredServices.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-red-500 dark:text-gray-400">No Church Service Found</p>
			</div>
		);
	}
	return (
		<>
			<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Start</Table.HeadCell>
					<Table.HeadCell>End</Table.HeadCell>
					<Table.HeadCell>Language</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{paginatedServices.map(service => (
						<Table.Row key={service.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

							<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								<div className="text-base font-semibold text-gray-900 dark:text-white">
									{service.name}
								</div>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{service.start_time}
							</Table.Cell>
							
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
							{service.end_time}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
							{service.language}
							</Table.Cell>
							
							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">

									<DeleteChurchServiceModal
										serviceId={service.id ?? ''}
										serviceName={service.name}
									/>
									<UpdateChurchServiceModal service={service} />
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

export default ChurchServiceTable