import { FC } from "react"
import { ChurchBranch } from "../../types/ChurchBranches";
import DeleteChurchBranchModal from "./DeleteChurchBranchModal";
import UpdateChurchBranchModal from "./UpdateChurchBranchModal";
import { Pagination, Table } from "flowbite-react";

interface ChurchBranchTableProps {
	paginatedBranches: ChurchBranch[];
	filteredBranches: ChurchBranch[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	canAccessDeleteBranchModal: any;
	canAccessUpdateBranchModal: any;
}


const ChurchBranchTable: FC<ChurchBranchTableProps> = ({
	currentPage,
	paginatedBranches,
	loading,
	filteredBranches,
	setCurrentPage,
	totalPages,
	canAccessDeleteBranchModal,
	canAccessUpdateBranchModal
}) => {
	if (loading) {
		<p>Loading....</p>
	}
	if (filteredBranches.length === 0) {
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
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Contact</Table.HeadCell>
					<Table.HeadCell>Location</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{paginatedBranches.map(branch => (
						<Table.Row key={branch.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

							<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								<div className="text-base font-semibold text-gray-900 dark:text-white">
									{branch.name}
								</div>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{branch.email}
							</Table.Cell>

							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
								{branch.church_number}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{branch.location}
							</Table.Cell>

							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">

									{canAccessDeleteBranchModal &&
										<DeleteChurchBranchModal
											branchId={branch.id ?? ''}
											branchName={branch.name}
										/>
									}
									{canAccessUpdateBranchModal && (
										<UpdateChurchBranchModal branch={branch} />
									)}
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

export default ChurchBranchTable