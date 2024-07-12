import { Button, Table } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import DeleteChurchStaffModal from "./DeleteChurchStaffModal";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ChurchStaff } from "../../types/ChurchStaff";

const ChurchStaffTable: FC = function () {

	const [churchStaffs, setChurchStaffs] = useState<ChurchStaff[]>([]);

	useEffect(() => {
		fetchChurchStaffs();
	}, [churchStaffs]);

	const fetchChurchStaffs = async () => {
		try {
			const response = await fetch("http://localhost:8000/church-staffs");
			if (response.ok) {
				const data = await response.json();
				setChurchStaffs(data.data); // Assuming data.data contains the array of church staffs
			} else {
				console.error("Failed to fetch church staffs");
			}
		} catch (error) {
			console.error("Error fetching church staffs:", error);
		}
	};



	return (
		<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
			<Table.Head className="bg-gray-100 dark:bg-gray-700">
				<Table.HeadCell>Full Name</Table.HeadCell>
				<Table.HeadCell>Email Address</Table.HeadCell>
				<Table.HeadCell>Phone Number</Table.HeadCell>
				<Table.HeadCell>Gender</Table.HeadCell>
				<Table.HeadCell>DOB</Table.HeadCell>
				<Table.HeadCell>Residence</Table.HeadCell>
				<Table.HeadCell>Actions</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
				{churchStaffs.map((staff) => (
					<Table.Row key={staff.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
						<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
							<div className="text-base font-semibold text-gray-900 dark:text-white">
								{staff.first_name} {staff.last_name}
							</div>
						</Table.Cell>
						<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
							{staff.email}
						</Table.Cell>
						<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
							{staff.phone_number}
						</Table.Cell>
						<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
							{staff.gender}
						</Table.Cell>
						<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
							{staff.dob}
						</Table.Cell>
						<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
							{staff.residence}
						</Table.Cell>
						<Table.Cell className="space-x-2 whitespace-nowrap p-4">
							<div className="flex items-center gap-x-3">

								<DeleteChurchStaffModal
									staffId={staff.id ?? ''}
									staffFirstName={staff.first_name}
									staffLastName={staff.last_name}
								/>
								<Link to={`/users/church-staffs/${staff.id}`} className="">
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
	);
};



export default ChurchStaffTable