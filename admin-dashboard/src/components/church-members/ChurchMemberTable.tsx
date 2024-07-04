import { Button, Checkbox, Table } from "flowbite-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import DeleteChurchMemberModal from "./DeleteChurchMemberModal";

const ChurchMemberTable: FC = function () {
	return (
		<Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
			<Table.Head className="bg-gray-100 dark:bg-gray-700">
				<Table.HeadCell>
					<span className="sr-only">Toggle selected</span>
					<Checkbox />
				</Table.HeadCell>
				<Table.HeadCell>Full Name</Table.HeadCell>
				<Table.HeadCell>Email Address</Table.HeadCell>
				<Table.HeadCell>Phone Number</Table.HeadCell>
				<Table.HeadCell>Gender</Table.HeadCell>
				<Table.HeadCell>DOB</Table.HeadCell>
				<Table.HeadCell>Residence</Table.HeadCell>
				<Table.HeadCell>Actions</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
				<Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
					<Table.Cell className="w-4 p-4">
						<Checkbox />
					</Table.Cell>
					<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
						<div className="text-base font-semibold text-gray-900 dark:text-white">
							Okello Charles
						</div>
						{/* <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
							ck.okello@gmail.com
						</div> */}
					</Table.Cell>
					<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
						ck.okello@gmail.com
					</Table.Cell>
					<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
						+267773202599
					</Table.Cell>
					<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
						Male
					</Table.Cell>
					<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
						22/04/2021
					</Table.Cell>
					<Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
						Omoro
					</Table.Cell>
					<Table.Cell className="space-x-2 whitespace-nowrap p-4">
						<div className="flex items-center gap-x-3">
							
							<DeleteChurchMemberModal />
							<Link to="#" color="primary" className="">
								<Button color="success" >
									<HiArrowRight className="mr-2 text-lg" />

								</Button>
							</Link>
						</div>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
};



export default ChurchMemberTable