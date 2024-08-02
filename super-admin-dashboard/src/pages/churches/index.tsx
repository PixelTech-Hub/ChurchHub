import { Breadcrumb, Button } from "flowbite-react"
import NavbarSidebarLayout from "../../layouts/navbar-sidebar"
import { HiDownload, HiHome, HiRefresh } from "react-icons/hi"
import SearchItem from "../../helpers/SearchItem"
import { useEffect, useState } from "react"
import ChurchesTable from "../../components/churches/ChurchesTable"
import AddChurchModal from "../../components/churches/AddChurchModal"
import useSearch from "../../hooks/useSearch"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getAllChurches } from "../../features/churches/churchSlice"
import { filterItems } from "../../utils/filterItem"
import { ITEMS_PER_PAGE } from "../../app/api"
import generatePDF from "../../utils/generatePDF"
import { EntityChurchAdminRoleEnum } from "../../enums/admin.enum"




const ChurchPage = () => {
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchTerm, handleSearch } = useSearch();

	const dispatch = useAppDispatch();
	const churches = useAppSelector((state) => {
		if (Array.isArray(state.church.data)) {
			return state.church.data;
		}
		return [];
	});
	const currentAdminRole = useAppSelector((state) => state.auth.currentAdmin?.role);




	useEffect(() => {
			dispatch(getAllChurches());
	}, [dispatch, churches]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, churches]);


	const filteredChurches = filterItems(churches, searchTerm, "name");

	const totalPages = Math.ceil(filteredChurches.length / ITEMS_PER_PAGE);

	const paginatedChurches = filteredChurches.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);


	const handleReload = () => {
		setIsReloading(true);
			dispatch(getAllChurches()).finally(() => {
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
					{ header: 'Contact', accessor: 'office_no' },
					{ header: 'Status', accessor: 'isEnabled' },
				],
				data: filteredChurches,
				filename: 'churches.pdf'
			});
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			setIsDownloading(false);
			setLoading(false);
		}
	};

	const canAccessAddStaffModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
		EntityChurchAdminRoleEnum.editor
	].includes(currentAdminRole as EntityChurchAdminRoleEnum);


	const canAccessDeletStaffModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
	].includes(currentAdminRole as EntityChurchAdminRoleEnum);
	
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
							value="Search for Churches..."
						/>
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end gap-3">
							{canAccessAddStaffModal && <AddChurchModal />}
							
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
								fetchChurches={getAllChurches}
								canAccessDeletStaffModal={canAccessDeletStaffModal}
							/>
						</div>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
	)
}

export default ChurchPage