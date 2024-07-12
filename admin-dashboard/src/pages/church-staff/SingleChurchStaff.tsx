/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	Breadcrumb,
} from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import { HiHome } from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useParams } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "../../app/api";
import IntroCard from "../../components/church-staff/IntroCard";
import TransactionHistoryCard from "../../components/church-staff/Transaction";
import GeneralInfoCard from "../../components/church-staff/GeneralInfoCard";
import CardDetailsCard from "../../components/church-staff/CardDetailsCard";

const SingleChurchStaff: FC = function () {

	const { id } = useParams()
	console.log(id)

	const [staff, setStaff] = useState(null);

	useEffect(() => {
		// Example: Fetch staff member details based on id
		axios.get(`${API_BASE_URL}/church-staffs/${id}`)
			.then(response => {
				setStaff(response.data);
			})
			.catch(error => {
				console.error('Error fetching staff details:', error);
			});
	}, [id]); // Fetch data whenever id changes

	console.log('staff++++', staff);

	// if (!staff) {
	// 	return <div>Loading...</div>;
	// }
	return (
		<NavbarSidebarLayout>
			<div className="mb-6 grid grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
				<div className="col-span-full">
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
					{/* <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
						{staff.first_name}  {staff.last_name}
					</h1> */}
				</div>
				{!staff ? <div>Loading... </div> : (
					<><IntroCard /><TransactionHistoryCard /></>
				)}
			</div>
			{!staff ? <div className="px-4">Loading... </div> : (
				<>
					<div className="grid grid-cols-1 gap-y-6 px-4">
						<GeneralInfoCard />
						<CardDetailsCard />
					</div>
				</>
			)}

		</NavbarSidebarLayout>
	);
};









export default SingleChurchStaff;
