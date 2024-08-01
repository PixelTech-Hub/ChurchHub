import { Footer } from "flowbite-react";
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { MdFacebook } from "react-icons/md";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { SidebarProvider, useSidebarContext } from "../context/SidebarContext";
import classNames from "classnames";
import DisableApp from "../components/dashboard/DisableApp";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserChurch } from "../features/churches/churchSlice";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children = true }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.auth.currentUser);
    const userChurch = useAppSelector((state) => state.church.userChurch);

    useEffect(() => {
      if (userChurch?.id) {
      
      }
    }, [dispatch, userChurch]);
  
    // console.log('branches', branches)
    // console.log('minisiiii', ministries)
  
   
  
  
  
    useEffect(() => {
      if (userData && userData.churchId) {
        dispatch(getUserChurch(userData.churchId));
      }
    }, [userData, dispatch]);
  
  
    useEffect(() => {
      if (userChurch && userChurch.isEnabled === false) {
        setModalIsOpen(true);
      }
    }, [userChurch]);
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
    return (
      <SidebarProvider>
        <DisableApp
        setModalIsOpen={setModalIsOpen}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        userChurch={userChurch}
      />
        <Navbar />
        <div className="flex items-start pt-16">
          <Sidebar />
          <MainContent>{children}</MainContent>
        </div>
      </SidebarProvider>
    );
  };

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  children,
  isFooter,
}) {
  const { isOpenOnSmallScreens: isSidebarOpen } = useSidebarContext();

  return (
    <main
      className={classNames(
        "overflow-y-auto relative w-full h-full bg-gray-50 dark:bg-gray-900",
        isSidebarOpen ? "lg:ml-16" : "lg:ml-64"
      )}
    >
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  );
};

const MainContentFooter: FC = function () {
  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <Footer.LinkGroup>
            <Footer.Link href="#" className="mr-3 mb-3 lg:mb-0">
              Terms and conditions
            </Footer.Link>
            <Footer.Link href="#" className="mr-3 mb-3 lg:mb-0">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="#" className="mr-3">
              Licensing
            </Footer.Link>
            <Footer.Link href="#" className="mr-3">
              Cookie Policy
            </Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup>
            <div className="flex gap-4 md:gap-0">
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <MdFacebook className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaInstagram className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaTwitter className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaGithub className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaDribbble className="text-lg" />
              </Footer.Link>
            </div>
          </Footer.LinkGroup>
        </div>
      </Footer>
      <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; 2023-2024 Church Hub All rights reserved.
      </p>
    </>
  );
};

export default NavbarSidebarLayout;
