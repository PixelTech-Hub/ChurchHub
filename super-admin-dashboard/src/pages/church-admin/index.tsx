import { useEffect, useState } from "react";
import { Users } from "../../types/Users";
import { CHURCH_ADMIN_API_URL, ITEMS_PER_PAGE } from "../../app/api";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button } from "flowbite-react";
import { HiDownload, HiHome, HiRefresh } from "react-icons/hi";
import SearchItem from "../../helpers/SearchItem";
import ChurchAdminTable from "../../components/admin/ChurchAdminTable";
import AddChurchAdminModal from "../../components/admin/AddChurchAdminModal";


const ChurchAdminPage = () => {
	const [users, setUsers] = useState<Users[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchChurchAdmins = async () => {
		try {
			const response = await fetch(CHURCH_ADMIN_API_URL);
			// console.log('response', response)
			if (response.ok) {
				const data = await response.json();
				setUsers(data.data); // Assuming data.data contains the array of church staffs
				setLoading(false)
			} else {
				console.error("Failed to fetch church administrator");
				setLoading(false)
			}
		} catch (error) {
			console.error("Error fetching church administrator:", error);
			setLoading(false)
		}
	};



	useEffect(() => {
		fetchChurchAdmins();
	}, [users]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm, users]);

	const filteredChurchAdmins = users.filter((user) =>
		user.name?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredChurchAdmins.length / ITEMS_PER_PAGE);

	const paginatedChurchAdmins = filteredChurchAdmins.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};



	const handleReload = () => {
		setIsReloading(true);
		fetchChurchAdmins().finally(() => {
			setIsReloading(false);
		});
	};

	const handleDownloadPDF = async () => {
		setIsDownloading(true);
		setLoading(true)
		try {
			const doc = new jsPDF();

			doc.text('Church Admins', 14, 15);

			const tableData = filteredChurchAdmins.map(user => [
				user.name,
				user.email,
				user.title,
				user.role,
				user.church?.name || '',
				user.isEnabled,
			]);

			(doc as any).autoTable({
				head: [['Full Name', 'Email', 'Title', 'Role', 'Church', 'Status']],
				body: tableData,
				startY: 20,
			});

			doc.save('church_admins.pdf');
		} catch (error) {
			console.error('Error generating PDF:', error);
			setIsDownloading(false);
			setLoading(false)
		} finally {
			setIsDownloading(false);
			setLoading(false)
		}
	};


	// console.log('CHurch administration', users)

	return (
		<NavbarSidebarLayout isFooter={false}>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item href="#">
								Admins
							</Breadcrumb.Item>
							<Breadcrumb.Item>Church Admins</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Church Administration
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchItem
							onSearch={handleSearch}
							value="Serarch for Church Admins..."
						/>
						<div className="flex w-full items-center sm:justify-end gap-4">
							<AddChurchAdminModal />
							<Button
								color="light"
								onClick={handleReload}
								className={`ml-2 transition-transform duration-300 ${isReloading ? '' : 'hover:scale-110'
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
								className={`transition-transform duration-300 ${isDownloading ? '' : 'hover:scale-110'
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
							<ChurchAdminTable
								paginatedChurchAdmins={paginatedChurchAdmins}
								filteredChurchAdmins={filteredChurchAdmins}
								loading={loading}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								fetchChurchAdmins={fetchChurchAdmins}
							/>
						</div>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
	)
}

export default ChurchAdminPage