/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Breadcrumb,
	Button,
} from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import {
	HiDownload,
	HiHome,
	HiRefresh,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import AddChurchStaffModal from "../../components/church-staff/AddChurchStaffModal";
import ChurchStaffTable from "../../components/church-staff/ChurchStaffTable";
import useSearch from "../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllChurchUsers } from "../../features/auth/authSlice";
import { filterItems } from "../../utils/filterItem";
import { ITEMS_PER_PAGE } from "../../app/api";
import generatePDF from "../../utils/generatePDF";
import SearchItem from "../../helpers/SearchItem";

const ChurchStaffPage: FC = function () {
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchTerm, handleSearch } = useSearch();

	const dispatch = useAppDispatch();
	const churchUsers = useAppSelector((state) => {
		if (Array.isArray(state.auth.data)) {
			return state.auth.data;
		}
		return [];
	});
	const churchId = useAppSelector((state) => state.church.userChurch);
	// const churchStaffRole = useAppSelector((state) => state.auth.data?.role)


	// console.log('church staff rl')


	useEffect(() => {
		if (churchId?.id) {
			dispatch(getAllChurchUsers(churchId.id));
		}
	}, [dispatch, churchId, churchUsers]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, churchUsers]);


	const filteredChurchStaffs = filterItems(churchUsers, searchTerm, "name");

	const totalPages = Math.ceil(filteredChurchStaffs.length / ITEMS_PER_PAGE);

	const paginatedChurchStaffs = filteredChurchStaffs.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);


	const handleReload = () => {
		setIsReloading(true);
		if (churchId?.id) {
			dispatch(getAllChurchUsers(churchId?.id)).finally(() => {
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
					{ header: 'Name', accessor: 'name' },
					{ header: 'Email', accessor: 'email' },
					{ header: 'Position', accessor: 'title' },
					{ header: 'Role', accessor: 'role' },
				],
				data: filteredChurchStaffs,
				filename: 'church_staffs.pdf'
			});
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			setIsDownloading(false);
			setLoading(false);
		}
	};

	// const canAccessAddStaffModal = [
	// 	EntityChurchAdminRoleEnum.superadmin,
	// 	EntityChurchAdminRoleEnum.admin,
	// 	EntityChurchAdminRoleEnum.editor
	// ].includes(churchStaffRole as EntityChurchAdminRoleEnum);


	// const canAccessDeletStaffModal = [
	// 	EntityChurchAdminRoleEnum.superadmin,
	// 	EntityChurchAdminRoleEnum.admin,
	// ].includes(churchStaffRole as EntityChurchAdminRoleEnum);


	// console.log('can accesss', churchUsers)


	return (
		<NavbarSidebarLayout isFooter={false}>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex ">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item href="/users/church-staff">
								Users
							</Breadcrumb.Item>
							<Breadcrumb.Item>Church Staffs</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Church Staffs
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchItem
							onSearch={handleSearch}
							value="Search for Church Staffs..."
						/>
						<div className="flex w-full items-center sm:justify-end gap-4">
							{/* {canAccessAddStaffModal && ( */}
								<AddChurchStaffModal />
							{/* )} */}
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
							<ChurchStaffTable
								paginatedChurchStaffs={paginatedChurchStaffs}
								filteredChurchStaffs={filteredChurchStaffs}
								loading={loading}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}

							/>
						</div>
					</div>
				</div>
			</div>
			{/* <Pagination /> */}
		</NavbarSidebarLayout>
	);
};
export default ChurchStaffPage;