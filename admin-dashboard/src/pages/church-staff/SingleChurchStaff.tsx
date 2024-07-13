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
    const { id } = useParams();
    console.log(id);

    const [staff, setStaff] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/church-staffs/${id}`);
                setStaff(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching staff details:', error);
                setIsLoading(false);
            }
        };

        fetchStaffDetails();
    }, [id]);

    console.log('staff++++', staff);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!staff) {
        return <div>No staff found.</div>;
    }

    return (
        <NavbarSidebarLayout>
            <div className="mb-6 grid grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
                <div className="col-span-full">
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item href="/">
                            <div className="flex items-center gap-x-3">
                                <HiHome className="text-xl" />
                                <span className="dark:text-white">Home</span>
                            </div>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/users/church-staffs">
                            Users
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Church Staffs</Breadcrumb.Item>
                    </Breadcrumb>
                    
                </div>
                <IntroCard 
					firstName={staff.first_name}
					lastName={staff.last_name}
					position={staff.position}
					email={staff.email} 
					phoneNumber={staff.phone_number} 
					residence={staff.residence} 
					career={staff.career}               />
                <TransactionHistoryCard staff={staff} />
            </div>
            <div className="grid grid-cols-1 gap-y-6 px-4">
                <GeneralInfoCard staff={staff} />
                <CardDetailsCard staff={staff} />
            </div>
        </NavbarSidebarLayout>
    );
};

export default SingleChurchStaff;
