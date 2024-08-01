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
import SearchChurchMembers from "../../components/church-members/SearchChurchMembers";
import ChurchMemberTable from "../../components/church-members/ChurchMemberTable";
import AddChurchMemberModal from "../../components/church-members/AddChurchMemberModal";
import useSearch from "../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllChurchMembers } from "../../features/church-members/memberSlice";
import { filterItems } from "../../utils/filterItem";
import { ITEMS_PER_PAGE } from "../../app/api";
import generatePDF from "../../utils/generatePDF";
import { EntityChurchAdminRoleEnum } from "../../enums/admin.enum";


const ChurchMembersPage: FC = function () {
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchTerm, handleSearch } = useSearch();

	const dispatch = useAppDispatch();
	const members = useAppSelector((state) => state.member.allChurchMembers || []);
	const churchId = useAppSelector((state) => state.church.userChurch);
	const churchStaffRole = useAppSelector((state) => state.auth.currentUser?.role)


	useEffect(() => {
		if (churchId?.id) {
			dispatch(getAllChurchMembers(churchId?.id));
		}
	}, [dispatch, churchId]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, members]);


	const filteredChurchMembers = filterItems(members, searchTerm, "full_name");

	const totalPages = Math.ceil(filteredChurchMembers.length / ITEMS_PER_PAGE);

	const paginatedChurchMembers = filteredChurchMembers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);


	const handleReload = () => {
		setIsReloading(true);
		if (churchId?.id) {
			dispatch(getAllChurchMembers(churchId?.id)).finally(() => {
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
					{ header: 'Name', accessor: 'full_name' },
					{ header: 'Email Address', accessor: 'email' },
					{ header: 'Contact', accessor: 'phone_number' },
					{ header: 'Career', accessor: 'job' },
					{ header: 'Education', accessor: 'education_level' },
				],
				data: filteredChurchMembers,
				filename: 'church_members.pdf'
			});
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			setIsDownloading(false);
			setLoading(false);
		}
	};

	const canAccessAddMemberModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
		EntityChurchAdminRoleEnum.editor
	].includes(churchStaffRole as EntityChurchAdminRoleEnum);


	const canAccessDeletMinistryeModal = [
		EntityChurchAdminRoleEnum.superadmin,
		EntityChurchAdminRoleEnum.admin,
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
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item href="/users/church-staff">
								Users
							</Breadcrumb.Item>
							<Breadcrumb.Item>Church Members</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Church Members
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchChurchMembers onSearch={handleSearch} />
						<div className="flex w-full items-center sm:justify-end gap-4">
							{canAccessAddMemberModal && <AddChurchMemberModal />}
							
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
							<ChurchMemberTable
								paginatedChurchMembers={paginatedChurchMembers}
								filteredChurchMembers={filteredChurchMembers}
								loading={loading}
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								canAccessDeletMinistryeModal={canAccessDeletMinistryeModal}
							/>
						</div>
					</div>
				</div>
			</div>
		</NavbarSidebarLayout>
	);
};

export default ChurchMembersPage;