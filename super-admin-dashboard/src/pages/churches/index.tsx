import { Breadcrumb, Button } from "flowbite-react"
import NavbarSidebarLayout from "../../layouts/navbar-sidebar"
import { HiDownload, HiHome, HiRefresh } from "react-icons/hi"
import SearchItem from "../../helpers/SearchItem"
import { useEffect, useState } from "react"
import { Churches } from "../../types/Churches"
import jsPDF from "jspdf"
import ChurchesTable from "../../components/churches/ChurchesTable"
import AddChurchModal from "../../components/churches/AddChurchModal"
import { CHURCH_API_URL } from "../../app/api"

const ITEMS_PER_PAGE = 10;


const ChurchPage = () => {
	const [churches, setChurches] = useState<Churches[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchChurches = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${CHURCH_API_URL}`);
			if (response.ok) {
				const data = await response.json();
				setChurches(data?.data); // Assuming data.data contains the array of church staffs
				setLoading(false)
			} else {
				console.error("Failed to fetch church services");
				setLoading(false)
			}
		} catch (error) {
			console.error("Error fetching churches:", error);
			setChurches([]);
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		fetchChurches();
	}, [churches]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm]);

	const filteredChurches = churches?.filter((church) =>
		church.name?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredChurches.length / ITEMS_PER_PAGE);

	const paginatedChurches = filteredChurches.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};


	const handleReload = () => {
		setIsReloading(true);
		fetchChurches().finally(() => {
		  setIsReloading(false);
		});
	  };

	const handleDownloadPDF = async () => {
		setIsDownloading(true);
		setLoading(true);
		try {
			const doc = new jsPDF();
	
			doc.setFontSize(18);
			doc.text('All Churches', 14, 15);
	
			const tableData = filteredChurches.map(church => [
				church.name,
				church.email,
				church.core_values,
				church.mission,
				church.office_no,
				church.website
			]);
	
			(doc as any).autoTable({
				head: [['Name', 'Email', 'Values', 'Mission', 'Number', 'Website']],
				body: tableData,
				startY: 25,
				headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
				columnStyles: {
					0: { cellWidth: 30 },
					1: { cellWidth: 40 },
					2: { cellWidth: 30 },
					3: { cellWidth: 30 },
					4: { cellWidth: 30 },
					5: { cellWidth: 30 }
				},
				styles: { overflow: 'linebreak', cellPadding: 2 },
				theme: 'striped'
			});
	
			doc.save('churches.pdf');
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			setIsDownloading(false);
			setLoading(false);
		}
	};

	// console.log(paginatedChurches)
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
								<p className='lg:text-base text-[10px]'>Church Management</p>
							</Breadcrumb.Item>
							<Breadcrumb.Item href='/churches'>
								<p className='lg:text-base text-[10px]'>Churches</p>
							</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Churches
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchItem
							onSearch={handleSearch}
							value="Serarch for Churches..."
						/>
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end gap-3">
							<AddChurchModal />
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
							<ChurchesTable
								paginatedChurches={paginatedChurches}
								filteredChurches={filteredChurches}
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

export default ChurchPage