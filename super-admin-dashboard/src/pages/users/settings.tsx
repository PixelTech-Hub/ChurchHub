/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
} from "flowbite-react";
import type { FC } from "react";
import {
  HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import UserProfileCard from "../../components/admin/UserProfileCard";
import GeneralInformationCard from "../../components/admin/GeneralInformationCard";
import PasswordInformationCard from "../../components/admin/PasswordInformationCard";

const UserSettingsPage: FC = function () {

  // const {currentAdmin: admin, isLoading} = useAppSelector(state => state.auth)
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  // 	dispatch(getLoggedInAdmin())
  // }, [admin]);

  // console.log(`User Settings`, admin)

  const admin = JSON.parse(localStorage.getItem("userData") ?? '');
  // console.log(`User Settings `, admin)

  // if (isLoading) {
  // 	return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

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
              <Breadcrumb.Item href="/users/list">Admins</Breadcrumb.Item>
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
              <PasswordInformationCard />
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-y-4">
              <GeneralInformationCard admin={admin}/>
            </div>
          </div>
        </div>
      </>
    </NavbarSidebarLayout>
  );
};

export default UserSettingsPage;
