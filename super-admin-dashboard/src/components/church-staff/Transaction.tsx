import { Badge, Card, Table } from "flowbite-react";
import { FC } from "react";

const TransactionHistoryCard: FC = function () {
	return (
		<Card>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white">
					Transaction History
				</h3>
				<div className="shrink-0">
					<a
						className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
						href="#"
					>
						View all
					</a>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto rounded-lg">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow sm:rounded-lg">
							<Table>
								<Table.Head>
									<Table.HeadCell>Transaction</Table.HeadCell>
									<Table.HeadCell>Date &amp; Time</Table.HeadCell>
									<Table.HeadCell>Amount</Table.HeadCell>
									<Table.HeadCell>Status</Table.HeadCell>
								</Table.Head>
								<Table.Body>
									<Table.Row>
										<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
											Payment from&nbsp;
											<span className="font-semibold">Bonnie Green</span>
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
											Apr 23 ,2021
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
											$2300
										</Table.Cell>
										<Table.Cell className="flex whitespace-nowrap p-4">
											<Badge color="success">Completed</Badge>
										</Table.Cell>
									</Table.Row>
									<Table.Row className="bg-gray-50 dark:bg-gray-700">
										<Table.Cell className="whitespace-nowrap rounded-l-lg p-4 text-sm font-normal text-gray-900 dark:text-white">
											Payment refund to&nbsp;
											<span className="font-semibold">#00910</span>
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
											Apr 23 ,2021
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
											-$670
										</Table.Cell>
										<Table.Cell className="flex whitespace-nowrap rounded-r-lg p-4">
											<Badge color="success">Completed</Badge>
										</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell className="whitespace-nowrap p-4 pb-0 text-sm font-normal text-gray-900 dark:text-white">
											Payment failed from&nbsp;
											<span className="font-semibold">#087651</span>
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap p-4 pb-0 text-sm font-normal text-gray-500 dark:text-gray-400">
											Apr 18, 2021
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap p-4 pb-0 text-sm font-semibold text-gray-900 dark:text-white">
											$234
										</Table.Cell>
										<Table.Cell className="flex whitespace-nowrap p-4 pb-0">
											<Badge color="failure">Cancelled</Badge>
										</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
export default TransactionHistoryCard;