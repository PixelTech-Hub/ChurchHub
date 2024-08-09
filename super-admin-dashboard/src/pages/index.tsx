import type { FC } from "react";
import { useEffect } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import StatisticCard from "../components/dashboard/StatisticCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllChurches } from "../features/churches/churchSlice";
import { FaChurch, FaUsers } from "react-icons/fa";
import { getAllAdmins } from "../features/auth/authSlice";
import { getAllChurchStaffs } from "../features/church-staff/staffSlice";

const DashboardPage: FC = function () {
  const { data: churches, loading } = useAppSelector(state => state.church)
  const admin = useAppSelector(state => state.auth.currentAdmin);
  const { allAdmins } = useAppSelector(state => state.auth);
  const { allUsers } = useAppSelector(state => state.staffs);


  const dispatch = useAppDispatch()


  useEffect(() => {
    if (admin?.id) {
      dispatch(getAllChurches());
      dispatch(getAllAdmins());
      dispatch(getAllChurchStaffs())
    }
  }, [dispatch, admin?.id]);

  return (
    <NavbarSidebarLayout>

      <div className="px-4 pt-6 mx-2">
        <div className="mt-4 grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {loading ? <p>Loading...</p> : (
            <StatisticCard
              title="All Churches"
              value={churches ? churches.length : 0}
              change={5}
              icon={<FaChurch className="text-blue-500 text-xl" />}
              color="bg-gradient-to-br from-purple-600 to-blue-500"

            />
          )}
          {loading ? <p>Loading...</p> : (
            <StatisticCard
              title="System Admins"
              value={allAdmins ? allAdmins.length : 0}
              change={5}
              icon={<FaUsers className="text-blue-500 text-xl" />}
              color="bg-gradient-to-br from-yellow-400 to-orange-500"

            />
          )}
          {loading ? <p>Loading...</p> : (
            <StatisticCard
              title="Church Staffs"
              value={allUsers ? allUsers?.length : 0}
              change={10}
              icon={<FaUsers className="text-blue-500 text-xl" />}
              color="bg-gradient-to-br from-green-400 to-cyan-500"
            />
          )}

          {/* <StatisticCard
            title="Church Services"
            value={services?.length ?? 0}
            change={-2}
            icon={<FaCross className="text-blue-500 text-xl" />}
            color="bg-gradient-to-br from-yellow-400 to-orange-500"
          /> */}
          {/* <StatisticCard
            title="Church Ministries"
            value={ministries?.length ?? 0}
            change={10}
            icon={<FaUsers className="text-blue-500 text-xl" />}
            color="bg-gradient-to-br from-green-400 to-cyan-500"
          /> */}
        </div>
        {/* <div className="my-4 grid grid-cols-1 xl:gap-4 2xl:grid-cols-3">
          <SessionsByCountry />
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
            <LatestCustomers />
            <AcquisitionOverview />
          </div>
        </div> */}
        {/* <Transactions /> */}
      </div>
    </NavbarSidebarLayout>
  );
};


export default DashboardPage;
