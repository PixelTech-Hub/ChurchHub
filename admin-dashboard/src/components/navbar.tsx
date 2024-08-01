/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, type FC } from "react";
import {
  DarkThemeToggle,
  Navbar,
} from "flowbite-react";
import {
  HiMenuAlt1,
  HiSearch,
  HiX,
} from "react-icons/hi";
import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import NotificationBellDropdown from "./layout/NotificationBellDropdown";
import AppDrawerDropdown from "./layout/AppDrawerDropdown";
import UserDropdown from "./layout/UserDropdown";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserChurch } from "../features/churches/churchSlice";




const ExampleNavbar: FC = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } = useSidebarContext();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const userChurch = useAppSelector((state) => state.church.userChurch);

  // console.log('userData:', userData);
  // console.log('userChurch:', userChurch);

  useEffect(() => {
    // console.log('useEffect triggered');
    if (userData && userData.churchId) {
      // console.log('Dispatching getUserChurch with churchId:', userData.churchId);
      dispatch(getUserChurch(userData.churchId));
    }
  }, [userData, dispatch]);

  


  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPageWithSidebar && (
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                {isOpenOnSmallScreens && isSmallScreen() ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            )}
            <Navbar.Brand href="/">
              <p className="font-extrabold">CHURCH HUB</p>
            </Navbar.Brand>
            <div className="hidden lg:flex lg:text-xl  ml-16 font-bold">
              <p className="dark:text-white">{userChurch?.name}</p>
            </div>
          </div>
          <div className="flex items-center lg:gap-3">
            <div className="flex items-center">
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 lg:hidden"
              >
                <span className="sr-only">Search</span>
                <HiSearch className="h-6 w-6" />
              </button>
              {/* <NotificationBellDropdown /> */}
              {/* <AppDrawerDropdown /> */}
              <DarkThemeToggle />
            </div>
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};





export default ExampleNavbar;
