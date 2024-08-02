import {  Pagination, Table } from "flowbite-react";
import { FC } from "react";
import { Users } from "../../types/Users";


interface ChurchStaffTableProps {
	paginatedChurchStaffs: Users[]
	filteredChurchStaffs: Users[]
	loading: boolean
	totalPages: number
	currentPage: number
	setCurrentPage: (page: number) => void;
	canAccessDeletStaffModal: boolean
}

const ChurchStaffTable: FC<ChurchStaffTableProps> = function ({ loading, totalPages, currentPage, setCurrentPage, filteredChurchStaffs, paginatedChurchStaffs, }) {

	if (loading) {
		<p>Loading....</p>
	}
	if (filteredChurchStaffs.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-red-500 dark:text-gray-400">No Church Staff Found</p>
			</div>
		);
	}

	


	return (
		<>
			<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>Full Name</Table.HeadCell>
					<Table.HeadCell>Email Address</Table.HeadCell>
					<Table.HeadCell>Position</Table.HeadCell>
					<Table.HeadCell>Role</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{paginatedChurchStaffs.map((staff) => (
						<Table.Row key={staff.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
							<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								<div className="text-base font-semibold text-gray-900 dark:text-white">
									{staff.name}
								</div>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{staff.email}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{staff.title}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{staff.role}
							</Table.Cell>


							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">
									
										{/* <DeleteChurchStaffModal
											staffId={staff.id ?? ''}
											staffName={staff.name ?? ''}
										/> */}
								

									{/* <Link to={`/users/church-staffs/${staff.id}`} className="">
										<Button color="success">
											<HiArrowRight className="mr-2 text-lg" />
										</Button>
									</Link> */}
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
	);
};



export default ChurchStaffTable