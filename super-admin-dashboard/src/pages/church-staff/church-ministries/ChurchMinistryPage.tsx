import {
	Breadcrumb,
} from "flowbite-react";
import { useState, type FC } from "react";
import {
	HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
import ChurchMinistriesTable from "../../../components/church-ministries/ChurchMinistriesTable";
import SearchChurchMinistry from "../../../components/church-ministries/SearchChurchMinistry";
import AddChurchMinistryModal from "../../../components/church-ministries/AddChurchMinistryModal";


const ChurchMinistryPage: FC = ({ }) => {
	const [searchTerm, setSearchTerm] = useState("");



	const handleSearch = (term: string) => {
		setSearchTerm(term);
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
						<div className="flex lg:flex-row flex-col w-full lg:items-center sm:justify-end">
							<AddChurchMinistryModal />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col mx-2 mt-2">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							<ChurchMinistriesTable searchTerm={searchTerm} />
						</div>
					</div>
				</div>
			</div>
			{/* <Pagination /> */}
		</NavbarSidebarLayout>
	)
}

export default ChurchMinistryPage