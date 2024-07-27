/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Admin } from "../../types/Admins";
import axios from "axios";
import { ADMIN_API_URL } from "../../app/api";
import { AuthData } from "../../types/AuthData";
import UserProfileCard from "../../components/admin/UserProfileCard";
import LanguageTimeCard from "../../components/admin/LanguageTimeCard";
import SocialAccountsCard from "../../components/admin/SocialAccountsCard";
import OtherAccountsCard from "../../components/admin/OtherAccountsCard";
import GeneralInformationCard from "../../components/admin/GeneralInformationCard";
import PasswordInformationCard from "../../components/admin/PasswordInformationCard";
import SessionsCard from "../../components/admin/SessionsCard";
import AlertsNotificationsCard from "../../components/admin/AlertsNotificationsCard";
import EmailNotificationsCard from "../../components/admin/EmailNotificationsCard";

const UserSettingsPage: FC = function () {
  
	const [admin, setAdmin] = useState<Admin | null>(null);
	const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState<AuthData | null>(null);
	

	

  useEffect(() => {
		const storedData = localStorage.getItem('userData');
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
		fetchAdmin();
	}, [authData?.id]);

	const fetchAdmin = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get<Admin>(`${ADMIN_API_URL}/${authData?.id}`);
			setAdmin(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching church details:', error);
			setIsLoading(false);
		}
	};

	// const updateChurchField = async (field: keyof Churches, value: string | number) => {
	// 	try {
	// 	  const response = await axios.patch(`${CHURCH_API_URL}/${churchId}`, {
	// 		[field]: value
	// 	  });
	// 	  if (response.status === 200) {
	// 		setChurch(prevChurch => prevChurch ? { ...prevChurch, [field]: value } : null);
	// 		setToastMessage({ type: 'success', message: `${field} updated successfully` });
	// 	  }
	// 	} catch (error) {
	// 	  console.error('Error updating church field:', error);
	// 	  setToastMessage({ type: 'error', message: `Failed to update ${field}` });
	// 	}
	//   };

	if (isLoading) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	if (!admin) {
		return <div className="flex justify-center items-center h-screen">Admin not found</div>;
	}
  return (
    <NavbarSidebarLayout>
      <>
        <div className="grid grid-cols-1 gap-y-6 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-3 xl:gap-4">
          <div className="col-span-full">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              User settings
            </h1>
          </div>
          <div className="col-span-full xl:col-auto">
            <div className="grid grid-cols-1 gap-y-4">
              <UserProfileCard 
              admin={admin}
              
              />
              <LanguageTimeCard />
              <SocialAccountsCard />
              <OtherAccountsCard />
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-y-4">
              <GeneralInformationCard />
              <PasswordInformationCard />
              <SessionsCard />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-6 px-4 pt-4 xl:grid-cols-2 xl:gap-4">
          <AlertsNotificationsCard />
          <EmailNotificationsCard />
        </div>
      </>
    </NavbarSidebarLayout>
  );
};

export default UserSettingsPage;
