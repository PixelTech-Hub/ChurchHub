/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Breadcrumb,
} from "flowbite-react";
import { useState, type FC } from "react";
import {
	HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import SearchChurchMembers from "../../components/church-members/SearchChurchMembers";
import ChurchMemberTable from "../../components/church-members/ChurchMemberTable";
import AddChurchMemberModal from "../../components/church-members/AddChurchMemberModal";

const ChurchMembersPage: FC = function () {
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
						<div className="flex w-full items-center sm:justify-end">
							<AddChurchMemberModal />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col mx-2 mt-2">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							<ChurchMemberTable searchTerm={searchTerm}/>
						</div>
					</div>
				</div>
			</div>
			<Pagination />
		</NavbarSidebarLayout>
	);
};
export default ChurchMembersPage;