/* eslint-disable jsx-a11y/anchor-is-valid */
import { Modal, } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";

import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { AuthData } from "../types/AuthData";
import { CHURCH_API_URL } from "../app/api";
import { Churches } from "../types/Churches";
import SalesThisWeek from "../components/dashboard/SalesThisWeek";
import NewProductsThisWeek from "../components/dashboard/NewProductsThisWeek";
import VisitorsThisWeek from "../components/dashboard/VisitorsThisWeek";
import Transactions from "../components/dashboard/Transactions";
import AcquisitionOverview from "../components/dashboard/AcquisitionOverview";
import SessionsByCountry from "../components/dashboard/SessionsByCountry";
import UserSignupsThisWeek from "../components/dashboard/UserSignupsThisWeek";
import LatestCustomers from "../components/dashboard/LatestCustomers";
import DisableApp from "../components/dashboard/DisableApp";

const DashboardPage: FC = function () {
  const [church, setChurch] = useState<Churches | null>(null);
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const fetchChurchId = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${CHURCH_API_URL}/${authData?.churchId}`);
      if (response.ok) {
        const data = await response.json();
        setChurch(data);

        // Check if the church is disabled and open the modal if it is
        if (data && data.isEnabled === false) {
          setModalIsOpen(true);
        }
      } else {
        console.error("Failed to fetch church services");
      }
    } catch (error) {
      console.error("Error fetching church services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authData) {
      fetchChurchId();
    }
  }, [authData]);

  useEffect(() => {
    if (church && church.isEnabled === false) {
      setModalIsOpen(true);
    }
  }, [church]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <NavbarSidebarLayout>
      <DisableApp 
        setModalIsOpen={setModalIsOpen} 
        closeModal={closeModal} 
        modalIsOpen={modalIsOpen}      
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
