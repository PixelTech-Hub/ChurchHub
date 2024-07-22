import { Button, Pagination, Table } from "flowbite-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import DeleteChurchMemberModal from "./DeleteChurchMemberModal";
import 'jspdf-autotable';
import { ChurchMembers } from "../../types/ChurchMember";


interface ChurchMemberTableProps {
	paginatedMembers: ChurchMembers[];
	filteredMembers: ChurchMembers[];
	loading: boolean;
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
}



const ChurchMemberTable: FC<ChurchMemberTableProps> = function ({
	paginatedMembers,
	filteredMembers,
	loading,
	totalPages,
	currentPage,
	setCurrentPage
}) {


	if (loading) {
		<p>Loading....</p>
	}
	if (filteredMembers.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-red-500 dark:text-gray-400">No Church Member Found</p>
			</div>
		);
	}

	return (
		<>
			<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
				<Table.Head className="bg-gray-100 dark:bg-gray-700">
					<Table.HeadCell>Full Name</Table.HeadCell>
					<Table.HeadCell>Email Address</Table.HeadCell>
					<Table.HeadCell>Phone Number</Table.HeadCell>
					<Table.HeadCell>Gender</Table.HeadCell>
					<Table.HeadCell>Career</Table.HeadCell>
					<Table.HeadCell>Residence</Table.HeadCell>
					<Table.HeadCell>Actions</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
					{paginatedMembers.map(member => (
						<Table.Row key={member.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

							<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								<div className="text-base font-semibold text-gray-900 dark:text-white">
									{member.full_name}
								</div>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{member.email}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								<a href={`tel:+${member.phone_number}`}>+{member.phone_number}</a>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
								{member.gender}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{member.job}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{member.residence}
							</Table.Cell>
							<Table.Cell className="space-x-2 whitespace-nowrap p-4">
								<div className="flex items-center gap-x-3">

									<DeleteChurchMemberModal
										memberId={member.id ?? ''}
										fullName={member.full_name}
									/>
									<Link to={`/users/church-members/${member.id}`} className="">
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
	);
};



export default ChurchMemberTable