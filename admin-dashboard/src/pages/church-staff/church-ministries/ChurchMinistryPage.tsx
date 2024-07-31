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
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import ChurchMinistriesTable from "../../../components/church-ministries/ChurchMinistriesTable";
import SearchChurchMinistry from "../../../components/church-ministries/SearchChurchMinistry";
import AddChurchMinistryModal from "../../../components/church-ministries/AddChurchMinistryModal";
import useSearch from "../../../hooks/useSearch";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAllChurchMinistries } from "../../../features/church-ministries/ministrySlice";
import { filterItems } from "../../../utils/filterItem";
import { ITEMS_PER_PAGE } from "../../../app/api";
import generatePDF from "../../../utils/generatePDF";

const ChurchMinistryPage: FC = ({ }) => {
	const [isReloading, setIsReloading] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchTerm, handleSearch } = useSearch();

	const dispatch = useAppDispatch();
	const ministries = useAppSelector((state) => state.ministry.allChurchMinistry || []);
	const churchId = useAppSelector((state) => state.church.userChurch);



	useEffect(() => {
		if (churchId?.id) {
			dispatch(getAllChurchMinistries(churchId.id));
		}
	}, [dispatch, churchId]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, ministries]);


	const filteredMinistries = filterItems(ministries, searchTerm, 'name');

	const totalPages = Math.ceil(filteredMinistries.length / ITEMS_PER_PAGE);

	const paginatedMinistries = filteredMinistries.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);


	const handleReload = () => {
		setIsReloading(true);
		if (churchId?.id) {
			dispatch(getAllChurchMinistries(churchId?.id)).finally(() => {
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
			  { header: 'Ministry Name', accessor: 'name' },
			  { header: 'Description', accessor: 'description' },
			],
			data: filteredMinistries,
			filename: 'church_ministry.pdf'
		  });
		} catch (error) {
		  console.error('Error generating PDF:', error);
		} finally {
		  setIsDownloading(false);
		  setLoading(false);
		}
	  };
	return (
		<NavbarSidebarLayout isFooter={false}>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex ">
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
							<Breadcrumb.Item href='/church-ministries'>
								<p className='lg:text-base text-[10px]'>Church Ministries</p>
							</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Church Ministries
						</h1>
					</div>
					<div className="block items-center sm:flex">
						<SearchChurchMinistry onSearch={handleSearch} />
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end gap-3">
							<AddChurchMinistryModal />
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
							<ChurchMinistriesTable
								paginatedMinistries={paginatedMinistries}
								filteredMinistries={filteredMinistries}
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
	)
}

export default ChurchMinistryPage