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
import SearchChurchMembers from "../../components/church-members/SearchChurchMembers";
import ChurchMemberTable from "../../components/church-members/ChurchMemberTable";
import AddChurchMemberModal from "../../components/church-members/AddChurchMemberModal";
import { ChurchMembers } from "../../types/ChurchMember";
import { AuthData } from "../../types/AuthData";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ITEMS_PER_PAGE = 10;

const ChurchMembersPage: FC = function () {
	const [members, setMembers] = useState<ChurchMembers[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [authData, setAuthData] = useState<AuthData | null>(null);

	const fetchChurchMembers = async () => {
		try {
			const response = await fetch(`http://localhost:8000/church-members/church/${authData?.data.churchId}`);
			// console.log('response', response)
			if (response.ok) {
				const data = await response.json();
				setMembers(data); // Assuming data.data contains the array of church staffs
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
		fetchChurchMembers();
	}, [authData]);

	useEffect(() => {
		// Reset to first page when search term changes
		setCurrentPage(1);
	}, [searchTerm, members]);

	const filteredMembers = members.filter((member) =>
		member.full_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

	const paginatedMembers = filteredMembers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	// console.log('paginatedMembers:', paginatedMembers)
	// console.log('filteredMembers:', filteredMembers)

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

			const tableData = filteredMembers.map(member => [
				member.full_name,
				member.email,
				member.phone_number,
				member.gender,
				member.job,
				member.residence
			]);

			(doc as any).autoTable({
				head: [['Full Name', 'Email', 'Phone', 'Gender', 'Career', 'Residence']],
				body: tableData,
				startY: 20,
			});

			doc.save('church_members.pdf');
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
							<AddChurchMemberModal />
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
								paginatedMembers={paginatedMembers}
								filteredMembers={filteredMembers}
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
	);
};

export default ChurchMembersPage;