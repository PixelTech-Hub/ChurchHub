/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, type FC } from "react";
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
import axios from "axios";
import { API_BASE_URL } from "../app/api";
import { Churches } from "../types/Churches";
import NotificationBellDropdown from "./layout/NotificationBellDropdown";
import AppDrawerDropdown from "./layout/AppDrawerDropdown";
import UserDropdown from "./layout/UserDropdown";
import { AuthData } from "../types/AuthData";




const ExampleNavbar: FC = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();
    const [loading, setLoading] = useState(false);
    const [church, setChurch] = useState<Churches>({} as Churches);
    const [authData, setAuthData] = useState<AuthData | null>(null);


  // const { data } = useAppSelector((state) => state.auth);
  const data = localStorage.getItem('auth');

  // console.log(data?.churchId);
  // console.log(accessToken);

  console.log('********------*****:', data)



  // console.log('church data', church)
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
    if (authData && authData.data.churchId) {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/churches/${authData.data.churchId}`, {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`
          }
        })
        .then((response) => {
          setChurch(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching church data:', error);
          setLoading(false);
        });
    }
  }, [authData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authData) {
    return <div>Please log in to view church data.</div>;
  }


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
              <img
                alt="logo"
                src=""
                className="mr-3 h-6 sm:h-8"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Church Hub
              </span>
            </Navbar.Brand>
            {/* <form className="ml-16 hidden md:block">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <TextInput
                icon={HiSearch}
                id="search"
                name="search"
                placeholder="Search"
                required
                size={32}
                type="search"
              />
            </form> */}
            <div className=" text-xl ml-16 font-bold">
              <p className="dark:text-white">{church.name}</p>
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
              <NotificationBellDropdown />
              <AppDrawerDropdown />
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
