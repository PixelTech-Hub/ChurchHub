import { FC, useEffect, useState } from "react";
import { ChurchServices } from "../../types/ChurchServices";
import { AuthData } from "../../types/AuthData";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button } from "flowbite-react";
import { HiDownload, HiHome, HiRefresh } from "react-icons/hi";
import SearchItem from "../../helpers/SearchItem";
import ChurchServiceTable from "../../components/church-service/ChurchServiceTable";
import AddChurchServiceModal from "../../components/church-service/AddChurchServiceModal";
import { ALL_CHURCH_SERVICE_API_URL } from "../../app/api";


const ITEMS_PER_PAGE = 10;


const ChurchService: FC = () => {
	const [services, setServices] = useState<ChurchServices[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [authData, setAuthData] = useState<AuthData | null>(null);

	const fetchChurchServices = async () => {
		try {
			const response = await fetch(`${ALL_CHURCH_SERVICE_API_URL}/${authData?.churchId}`);
			// console.log('response', response)
			if (response.ok) {
				const data = await response.json();
				setServices(data); // Assuming data.data contains the array of church staffs
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
		const storedData = localStorage.getItem('userData');
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
		fetchChurchServices();
	}, [authData, services]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm, services]);

	const filteredServices = services.filter((service) =>
		service.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

	const paginatedServices = filteredServices.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};


	const handleReload = () => {
		setIsReloading(true);
		fetchChurchServices().finally(() => {
		  setIsReloading(false);
		});
	  };

	const handleDownloadPDF = async () => {
		setIsDownloading(true);
		setLoading(true)
		try {
			const doc = new jsPDF();

			doc.text('Church Members', 14, 15);

			const tableData = filteredServices.map(service => [
				service.name,
				service.start_time,
				service.end_time,
				service.language,
			]);

			(doc as any).autoTable({
				head: [['Service Name', 'Start At', 'Ends At', 'Language']],
				body: tableData,
				startY: 20,
			});

			doc.save('church_services.pdf');
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
							<Breadcrumb.Item href='/church-services'>
								<p className='lg:text-base text-[10px]'>Church Services</p>
							</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Church Services
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchItem
							onSearch={handleSearch}
							value="Serarch for Church Services..."
						/>
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end gap-3">
							<AddChurchServiceModal />
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
									'Downloading...' : 'Download'
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
							<ChurchServiceTable
								paginatedServices={paginatedServices}
								filteredServices={filteredServices}
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

export default ChurchService