import classNames from "classnames";
import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  // const [currentPage, setCurrentPage] = useState("");
  const [isChurchInitiative, setIsChurchInitiative] = useState(true);
  const [isUsersOpen, setUsersOpen] = useState(true);

  useEffect(() => {
    const newPage = window.location.pathname;

    // setCurrentPage(newPage);
    setIsChurchInitiative(newPage.includes("/"));
    setUsersOpen(newPage.includes("/users/"));
  }, [ setIsChurchInitiative, setUsersOpen]);

  return (
    <div
      className={classNames("lg:!block bg-primary-500", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <form className="pb-3 md:hidden">
              <TextInput
                icon={HiSearch}
                type="search"
                placeholder="Search"
                required
                size={32}
              />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="/"
                  icon={HiChartPie}
                  
                >
                  Dashboard
                </Sidebar.Item>
                {/* <Sidebar.Item
                  href="/kanban"
                  icon={HiViewGrid}
                  className={
                    "/kanban" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Task Management
                </Sidebar.Item> */}
                {/* <Sidebar.Item
                  href="/mailing/inbox"
                  icon={HiInboxIn}
                  label="3"
                  className={
                    "/mailing/inbox" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Message
                </Sidebar.Item> */}
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="Church Initiatives"
                  open={isChurchInitiative}
                >
                  <Sidebar.Item
                    href="/church-branches"
                    
                  >
                    Church Branches
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/church-services"
                    
                  >
                    Church Services
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/church-ministries"
                    
                  >
                    Church Ministries
                  </Sidebar.Item>
                  {/* <Sidebar.Item
                    href="/e-commerce/invoice"
                    className={
                      "/e-commerce/invoice" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Church Ministries
                  </Sidebar.Item> */}
                </Sidebar.Collapse>
                <Sidebar.Collapse
                  icon={HiUsers}
                  label="User Management"
                  open={isUsersOpen}
                >
                  {/* <Sidebar.Item
                    href="/users/list"
                    className={
                      "/users/list" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Users list
                  </Sidebar.Item> */}
                  <Sidebar.Item
                    href="/users/church-members"
                    
                  >
                    Church Members
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/church-staffs"
                    
                  >
                    Church Staffs
                  </Sidebar.Item>
                  {/* <Sidebar.Item
                    href="/users/settings"
                    className={
                      "/users/settings" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Settings
                  </Sidebar.Item> */}
                </Sidebar.Collapse>
                {/* <Sidebar.Collapse icon={HiChartSquareBar} label="Financial Records"> */}
                  {/* <Sidebar.Item href="/pages/pricing">Transactions</Sidebar.Item>
                  <Sidebar.Item href="/pages/maintenance">
                    Staff Payment
                  </Sidebar.Item> */}
                  {/* <Sidebar.Item href="/pages/404">404 not found</Sidebar.Item>
                  <Sidebar.Item href="/pages/500">
                    500 server error
                  </Sidebar.Item> */}
                {/* </Sidebar.Collapse> */}
                {/* <Sidebar.Collapse icon={HiLockClosed} label="Authentication">
                  <Sidebar.Item href="/authentication/sign-in">
                    Sign in
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/sign-up">
                    Sign up
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/forgot-password">
                    Forgot password
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/reset-password">
                    Reset password
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/profile-lock">
                    Profile lock
                  </Sidebar.Item>
                </Sidebar.Collapse> */}
              </Sidebar.ItemGroup>
              {/* <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="https://github.com/themesberg/flowbite-react/"
                  icon={HiClipboard}
                >
                  Docs
                </Sidebar.Item>
                <Sidebar.Item
                  href="https://flowbite-react.com/"
                  icon={HiCollection}
                >
                  Components
                </Sidebar.Item>
                <Sidebar.Item
                  href="https://github.com/themesberg/flowbite-react/issues"
                  icon={HiInformationCircle}
                >
                  Help
                </Sidebar.Item>
              </Sidebar.ItemGroup> */}
            </Sidebar.Items>
          </div>
          {/* <BottomMenu /> */}
        </div>
      </Sidebar>
    </div>
  );
};





export default ExampleSidebar;
