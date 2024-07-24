import { useEffect, useState } from 'react'
import { ChurchBranch } from '../../types/ChurchBranches';
import { AuthData } from '../../types/AuthData';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import { Breadcrumb, Button } from 'flowbite-react';
import { HiDownload, HiHome, HiRefresh } from 'react-icons/hi';
import SearchItem from '../../helpers/SearchItem';
import AddChurchBranchModal from '../../components/church-branch/AddChurchBranchModal';
import ChurchBranchTable from '../../components/church-branch/ChurchBranchTable';


const ITEMS_PER_PAGE = 10;

const ChurchBranches = () => {
	const [branches, setBranches] = useState<ChurchBranch[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [authData, setAuthData] = useState<AuthData | null>(null);

	const fetchChurchBranches = async () => {
		try {
			const response = await fetch(`http://localhost:8000/church_branches/church/${authData?.data.churchId}`);
			// console.log('response', response)
			if (response.ok) {
				const data = await response.json();
				setBranches(data); // Assuming data.data contains the array of church staffs
				setLoading(false)
			} else {
				console.error("Failed to fetch church services");
				setLoading(false)
			}
		} catch (error) {
			console.error("Error fetching church services:", error);
			setLoading(false)
		}
	};

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
		fetchChurchBranches();
	}, [authData, branches]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm, branches]);

	const filteredBranches = branches.filter((branch) =>
		branch.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);

	const paginatedBranches = filteredBranches.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};


	const handleReload = () => {
		setIsReloading(true);
		// Simulating a reload delay
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	const handleDownloadPDF = async () => {
		setIsDownloading(true);
		setLoading(true)
		try {
			const doc = new jsPDF();

			doc.text('Church Members', 14, 15);

			const tableData = filteredBranches.map(branch => [
				branch.name,
				branch.email,
				branch.church_number,
				branch.location,
			]);

			(doc as any).autoTable({
				head: [['Branch Name', 'Email Address', 'Telephone', 'Location']],
				body: tableData,
				startY: 20,
			});

			doc.save('church_branches.pdf');
		} catch (error) {
			console.error('Error generating PDF:', error);
			setIsDownloading(false);
			setLoading(false)
		} finally {
			setIsDownloading(false);
			setLoading(false)
		}
	};

	return (
		<NavbarSidebarLayout isFooter={false}>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white lg:text-base text-sm">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item href="#" >
								<p className='lg:text-base text-[10px]'>Church Initiatives</p>
							</Breadcrumb.Item>
							<Breadcrumb.Item href='/church-branches'>
								<p className='lg:text-base text-[10px]'>Church Branches</p>
							</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Church Branches
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchItem
							onSearch={handleSearch}
							value="Serarch for Church Branches..."
						/>
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end gap-3">
							<AddChurchBranchModal />
							<Button
								color="light"
								onClick={handleReload}
								className={` transition-transform duration-300 ${isReloading ? '' : 'hover:bg-gray-800 '
									}`}
							>
								<HiRefresh className={`mr-2 h-5 w-5 ${isReloading ? 'opacity-0' : ''}`} />
								<span className={isReloading ? 'opacity-0' : ''}>Reload</span>
								{isReloading && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full "></div>
									</div>
								)}
							</Button>
							<Button
								color="light"
								onClick={handleDownloadPDF}
								disabled={isDownloading}
								className={`transition-transform duration-300 ${isDownloading ? '' : ''
									}`}
							>
								<HiDownload className={`mr-2 h-5 w-5 ${isDownloading ? 'opacity-0' : ''}`} />
								<span className={isDownloading && loading ? 'opacity-0' : ''}>{isDownloading && loading ?
									'Downloading...' : 'Download PDF'
								}</span>
								{isDownloading && loading && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full animate-spin"></div>
									</div>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col mx-2 mt-2">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							<ChurchBranchTable
								paginatedBranches={paginatedBranches}
								filteredBranches={filteredBranches}
								loading={loading}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						</div>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
  )
}

export default ChurchBranches