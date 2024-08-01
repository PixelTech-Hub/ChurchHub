import { useEffect, useState } from 'react';
import NavbarSidebarLayout from '../../layouts/navbar-sidebar';
import { Breadcrumb, Button } from 'flowbite-react';
import { HiDownload, HiHome, HiRefresh } from 'react-icons/hi';
import SearchItem from '../../helpers/SearchItem';
import AddChurchBranchModal from '../../components/church-branch/AddChurchBranchModal';
import ChurchBranchTable from '../../components/church-branch/ChurchBranchTable';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllChurchBranches } from '../../features/church-branches/branchSlice';
import useSearch from '../../hooks/useSearch';
import { filterItems } from '../../utils/filterItem';
import { ITEMS_PER_PAGE } from '../../app/api';
import generatePDF from '../../utils/generatePDF';
import { EntityChurchAdminRoleEnum } from '../../enums/admin.enum';


const ChurchBranches = () => {
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchTerm, handleSearch } = useSearch();

	const dispatch = useAppDispatch();
	const branches = useAppSelector((state) => state.branch.allChurchBranches || []);
	const churchId = useAppSelector((state) => state.church.userChurch);

	const churchStaffRole = useAppSelector((state) => state.auth.data?.role)



	useEffect(() => {
		if (churchId?.id) {
			dispatch(getAllChurchBranches(churchId.id));
		}
	}, [dispatch, churchId]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, branches]);


	const filteredBranches = filterItems(branches, searchTerm, 'name');

	const totalPages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);

	const paginatedBranches = filteredBranches.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);


	const handleReload = () => {
		setIsReloading(true);
		if (churchId?.id) {
			dispatch(getAllChurchBranches(churchId?.id)).finally(() => {
				setIsReloading(false);
			});
		}
	};

	const handleDownloadPDF = async () => {
		setIsDownloading(true);
		setLoading(true);
		try {
			generatePDF({
				columns: [
					{ header: 'Branch Name', accessor: 'name' },
					{ header: 'Email Address', accessor: 'email' },
					{ header: 'Telephone', accessor: 'church_number' },
					{ header: 'Location', accessor: 'location' },
				],
				data: filteredBranches,
				filename: 'church_branches.pdf'
			});
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			setIsDownloading(false);
			setLoading(false);
		}
	};

	const canAccessAddBranchModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
		EntityChurchAdminRoleEnum.editor
	].includes(churchStaffRole as EntityChurchAdminRoleEnum);


	const canAccessDeleteBranchModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
	].includes(churchStaffRole as EntityChurchAdminRoleEnum);


	const canAccessUpdateBranchModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
		EntityChurchAdminRoleEnum.editor
	].includes(churchStaffRole as EntityChurchAdminRoleEnum);


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
							<Breadcrumb.Item href="#">
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
							value="Search for Church Branches..."
						/>
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end gap-3">
							{canAccessAddBranchModal && <AddChurchBranchModal />}
							<Button
								color="light"
								onClick={handleReload}
								className={`transition-transform duration-300 ${isReloading ? '' : 'hover:bg-gray-800'}`}
							>
								<HiRefresh className={`mr-2 h-5 w-5 ${isReloading ? 'opacity-0' : ''}`} />
								<span className={isReloading ? 'opacity-0' : ''}>Reload</span>
								{isReloading && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="h-5 w-5 border-t-2 border-b-2 border-gray-300 rounded-full animate-spin"></div>
									</div>
								)}
							</Button>
							<Button
								color="light"
								onClick={handleDownloadPDF}
								disabled={isDownloading}
								className={`transition-transform duration-300 ${isDownloading ? '' : ''}`}
							>
								<HiDownload className={`mr-2 h-5 w-5 ${isDownloading ? 'opacity-0' : ''}`} />
								<span className={isDownloading && loading ? 'opacity-0' : ''}>{isDownloading && loading ? 'Downloading...' : 'Download PDF'}</span>
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
								canAccessDeleteBranchModal={canAccessDeleteBranchModal}
								canAccessUpdateBranchModal={canAccessUpdateBranchModal}
							/>
						</div>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
	);
};
export default ChurchBranches;