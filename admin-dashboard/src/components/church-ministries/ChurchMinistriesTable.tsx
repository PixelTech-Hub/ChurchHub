import { FC, useEffect, useState } from 'react'
import { AuthData } from '../../types/AuthData';
import { ChurchMinistries } from '../../types/ChurchMinistries';
import { Button, Pagination, Table } from 'flowbite-react';
import DeleteChurchMinistryModal from './DeleteChurchMinistryModal';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { truncateText } from '../../helpers/truncateText';


interface ChurchMinistryTableProps {
	searchTerm: string;
}

const ITEMS_PER_PAGE = 10;

const ChurchMinistriesTable: FC<ChurchMinistryTableProps> = ({ searchTerm }) => {
	const [ministries, setMinistries] = useState<ChurchMinistries[]>([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [authData, setAuthData] = useState<AuthData | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem('auth');
		if (storedData) {
			try {
				const parsedData: AuthData = JSON.parse(storedData);
				setAuthData(parsedData);
			} catch (error) {
				console.error('Error parsing auth data:', error);
			}
		}
	}, []);

	useEffect(() => {
		fetchChurchMinistries();
	}, [authData, ministries]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm]);

	const filteredMinistries = ministries.filter((ministry) =>
		ministry.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredMinistries.length / ITEMS_PER_PAGE);

	const paginatedMinistries = filteredMinistries.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const fetchChurchMinistries = async () => {
		try {
			const response = await fetch(`http://localhost:8000/church_ministries/church/${authData?.data.churchId}`);
			// console.log('response', response)
			if (response.ok) {
				const data = await response.json();
				setMinistries(data); // Assuming data.data contains the array of church staffs
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

	// console.log("members", members);

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
								{truncateText(ministry.description, 100)}
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