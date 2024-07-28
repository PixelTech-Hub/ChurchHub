/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import { useEffect, useState } from "react";

import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import SalesThisWeek from "../components/dashboard/SalesThisWeek";
import NewProductsThisWeek from "../components/dashboard/NewProductsThisWeek";
import VisitorsThisWeek from "../components/dashboard/VisitorsThisWeek";
import Transactions from "../components/dashboard/Transactions";
import AcquisitionOverview from "../components/dashboard/AcquisitionOverview";
import SessionsByCountry from "../components/dashboard/SessionsByCountry";
import UserSignupsThisWeek from "../components/dashboard/UserSignupsThisWeek";
import LatestCustomers from "../components/dashboard/LatestCustomers";
import DisableApp from "../components/dashboard/DisableApp";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserChurch } from "../features/churches/churchSlice";

const DashboardPage: FC = function () {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const userChurch = useAppSelector((state) => state.church.userChurch);


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
    <NavbarSidebarLayout>
      <DisableApp 
        setModalIsOpen={setModalIsOpen} 
        closeModal={closeModal} 
        modalIsOpen={modalIsOpen} 
        userChurch={userChurch} 
      />
      <div className="px-4 pt-6">
        <SalesThisWeek />
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <NewProductsThisWeek />
          <VisitorsThisWeek />
          <UserSignupsThisWeek />
        </div>
        <div className="my-4 grid grid-cols-1 xl:gap-4 2xl:grid-cols-3">
          <SessionsByCountry />
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
            <LatestCustomers />
            <AcquisitionOverview />
          </div>
        </div>
        <Transactions />
      </div>
    </NavbarSidebarLayout>
  );
};
























export default DashboardPage;
