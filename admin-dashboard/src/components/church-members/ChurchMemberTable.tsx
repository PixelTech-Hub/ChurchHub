import { Button, Pagination, Table } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import DeleteChurchMemberModal from "./DeleteChurchMemberModal";
import { ChurchMembers } from "../../types/ChurchMember";


interface ChurchMemberTableProps {
	searchTerm: string;
}

const ITEMS_PER_PAGE = 10;

const ChurchMemberTable: FC<ChurchMemberTableProps> = function ({ searchTerm }) {

	const [members, setMembers] = useState<ChurchMembers[]>([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetchChurchMembers();
	}, [members]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm]);

	const filteredMembers = members.filter((member) =>
		member.full_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

	const paginatedMembers = filteredMembers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const fetchChurchMembers = async () => {
		try {
			const response = await fetch("http://localhost:8000/church-members");
			if (response.ok) {
				const data = await response.json();
				setMembers(data); // Assuming data.data contains the array of church staffs
				setLoading(false)
			} else {
				console.error("Failed to fetch church staffs");
				setLoading(false)
			}
		} catch (error) {
			console.error("Error fetching church staffs:", error);
			setLoading(false)
		}
	};

	console.log("members", members);

	if (loading) {
		<p>Loading....</p>
	}
	if (filteredMembers.length === 0) {
		return (
			<div className="text-center py-4">
				<p className="text-red-500 dark:text-gray-400">No Church Member with that name found</p>
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
						<Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

							<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
								<div className="text-base font-semibold text-gray-900 dark:text-white">
									{member.full_name}
								</div>
								{/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
							ck.okello@gmail.com
						</div> */}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{member.email}
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
								{member.phone_number}
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