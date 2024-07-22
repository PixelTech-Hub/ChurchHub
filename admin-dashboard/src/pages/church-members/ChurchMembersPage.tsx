/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Breadcrumb,
	Button,
  } from "flowbite-react";
  import { useState, type FC } from "react";
  import {
	HiHome,
	HiRefresh,
  } from "react-icons/hi";
  
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  import SearchChurchMembers from "../../components/church-members/SearchChurchMembers";
  import ChurchMemberTable from "../../components/church-members/ChurchMemberTable";
  import AddChurchMemberModal from "../../components/church-members/AddChurchMemberModal";
  
  const ChurchMembersPage: FC = function () {
	const [searchTerm, setSearchTerm] = useState("");
	const [isReloading, setIsReloading] = useState(false);
  
	const handleSearch = (term: string) => {
	  setSearchTerm(term);
	};
  
	const handleReload = () => {
	  setIsReloading(true);
	  // Simulating a reload delay
	  setTimeout(() => {
		window.location.reload();
	  }, 1000);
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
			  <div className="flex w-full items-center sm:justify-end">
				<AddChurchMemberModal />
				<Button
				  color="light"
				  onClick={handleReload}
				  className={`ml-2 transition-transform duration-300 ${
					isReloading ? '' : 'hover:scale-110'
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
			  </div>
			</div>
		  </div>
		</div>
		<div className="flex flex-col mx-2 mt-2">
		  <div className="overflow-x-auto">
			<div className="inline-block min-w-full align-middle">
			  <div className="overflow-hidden shadow">
				<ChurchMemberTable searchTerm={searchTerm} />
			  </div>
			</div>
		  </div>
		</div>
	  </NavbarSidebarLayout>
	);
  };
  
  export default ChurchMembersPage;