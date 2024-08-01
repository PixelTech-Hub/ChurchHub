import type { FC } from "react";
import { useEffect, useState } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import Transactions from "../components/dashboard/Transactions";
import AcquisitionOverview from "../components/dashboard/AcquisitionOverview";
import SessionsByCountry from "../components/dashboard/SessionsByCountry";
import LatestCustomers from "../components/dashboard/LatestCustomers";
import DisableApp from "../components/dashboard/DisableApp";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserChurch } from "../features/churches/churchSlice";
import StatisticCard from "../components/dashboard/StatisticCard";
import { FaChurch, FaCross, FaUsers } from "react-icons/fa";
import { getAllChurchBranches } from "../features/church-branches/branchSlice";
import { getAllChurchMinistries } from "../features/church-ministries/ministrySlice";
import { getAllChurchServices } from "../features/church-services/serviceSlice";

const DashboardPage: FC = function () {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.data);
  const userChurch = useAppSelector((state) => state.church.userChurch);

  const branches = useAppSelector((state) => state.branch.allChurchBranches ?? [])
  const ministries = useAppSelector((state) => state.ministry.allChurchMinistry)
  const services = useAppSelector((state) => state.service.allChurchServices)


  useEffect(() => {
		if (userChurch?.id) {
			dispatch(getAllChurchBranches(userChurch.id));
      dispatch(getAllChurchMinistries(userChurch.id));
      dispatch(getAllChurchServices(userChurch.id));
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
    <NavbarSidebarLayout>
      <DisableApp
        setModalIsOpen={setModalIsOpen}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        userChurch={userChurch}
      />
      <div className="px-4 pt-6 mx-2">
        <div className="mt-4 grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <StatisticCard
            title="Church Branches"
            value={branches.length ?? 0}
            change={5}
            icon={<FaChurch className="text-blue-500 text-xl" />}
            color="bg-gradient-to-br from-purple-600 to-blue-500"
            
          />
          <StatisticCard
            title="Church Services"
            value={services?.length ?? 0}
            change={-2}
            icon={<FaCross className="text-blue-500 text-xl" />}
            color="bg-gradient-to-br from-yellow-400 to-orange-500"
          />
          <StatisticCard
            title="Church Ministries"
            value={ministries?.length ?? 0}
            change={10}
            icon={<FaUsers className="text-blue-500 text-xl" />}
            color="bg-gradient-to-br from-green-400 to-cyan-500"
          />
        </div>
        {/* <SalesThisWeek />
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ChurchBranchTrend />
          <NewProductsThisWeek />
          <VisitorsThisWeek />
          <UserSignupsThisWeek />
        </div> */}
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
