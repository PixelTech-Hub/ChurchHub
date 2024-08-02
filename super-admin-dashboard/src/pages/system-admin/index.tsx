import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, } from "../../app/api";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button } from "flowbite-react";
import { HiDownload, HiHome, HiRefresh } from "react-icons/hi";
import SearchItem from "../../helpers/SearchItem";
import SystemAdminTable from "../../components/system-admin/SystemAdminTable";
import useSearch from "../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllAdmins } from "../../features/auth/authSlice";
import { filterItems } from "../../utils/filterItem";
import generatePDF from "../../utils/generatePDF";
import { EntityChurchAdminRoleEnum } from "../../enums/admin.enum";


const SystemAdminPage = () => {
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchTerm, handleSearch } = useSearch();

	const dispatch = useAppDispatch();
	const admins = useAppSelector((state) => {
		if (Array.isArray(state.auth.allAdmins)) {
			return state.auth.allAdmins;
		}
		return [];
	});
	const currentUserRole = useAppSelector((state) => state.auth.currentAdmin?.role);




	useEffect(() => {
	
			dispatch(getAllAdmins());
		
	}, [dispatch]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);


	const filteredAdmins = filterItems(admins, searchTerm, "name");

	const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);

	const paginatedAdmins = filteredAdmins.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);


	const handleReload = () => {
		setIsReloading(true);
			dispatch(getAllAdmins()).finally(() => {
				setIsReloading(false);
			});
	};

	const handleDownloadPDF = async () => {
		setIsDownloading(true);
		setLoading(true);
		try {
			generatePDF({
				columns: [
					{ header: 'Name', accessor: 'name' },
					{ header: 'Email', accessor: 'email' },
					{ header: 'Position', accessor: 'title' },
					{ header: 'Role', accessor: 'role' },
				],
				data: filteredAdmins,
				filename: 'admins.pdf'
			});
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			setIsDownloading(false);
			setLoading(false);
		}
	};

	const canAccessAddAdminModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
		EntityChurchAdminRoleEnum.editor
	].includes(currentUserRole as EntityChurchAdminRoleEnum);


	const canAccessDeletAdminModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
	].includes(currentUserRole as EntityChurchAdminRoleEnum);


	console.log('hello', admins)

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
							<Breadcrumb.Item>System Admins</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All System Administrations
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchItem
							onSearch={handleSearch}
							value="Search for System Admins..."
						/>
						<div className="flex w-full items-center sm:justify-end gap-4">
							{/* <AddChurchAdminModal /> */}
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
							<SystemAdminTable
								paginatedSystemAdmins={paginatedAdmins}
								filteredSystemAdmins={paginatedAdmins}
								loading={loading}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								fetchSystemAdmins={getAllAdmins}
							/>
						</div>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
  )
}

export default SystemAdminPage