import { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllChurchBranches } from "../../features/church-branches/branchSlice";
import ChurchBranchChart from "./ChurchBranchChart";
import { FaChurch, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ChurchBranchTrend: FC = function () {
  const dispatch = useAppDispatch();
  const { allChurchBranches, loading, error } = useAppSelector((state) => state.branch);
  const church = useAppSelector((state) => state.church.userChurch);
  const [branchCount, setBranchCount] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

  useEffect(() => {
    if (church?.id) {
      dispatch(getAllChurchBranches(church.id));
    }
  }, [dispatch, church]);

  useEffect(() => {
    if (allChurchBranches) {
      setBranchCount(allChurchBranches.length);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const newBranches = allChurchBranches.filter(branch => {
        if (branch.createdAt) {
          const creationDate = new Date(branch.createdAt);
          return creationDate > oneWeekAgo;
        }
        return false;
      }).length;
      
      setGrowthRate((newBranches / allChurchBranches.length) * 100);
    }
  }, [allChurchBranches]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <FaChurch className="text-4xl text-primary-600" />
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64 text-red-500">
      <FaExclamationTriangle className="mr-2" />
      <span>Error: {error}</span>
    </div>
  );

  if (!church?.id) return (
    <div className="flex items-center justify-center h-64 text-yellow-500">
      <FaExclamationTriangle className="mr-2" />
      <span>Please select a church to view branch trends.</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg bg-white shadow dark:bg-gray-800 p-2"
    >
      <div className="flex items-center justify-between mb-4 p-4">
        <div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="text-3xl font-bold leading-none text-gray-900 dark:text-white sm:text-4xl"
          >
            {branchCount}
          </motion.span>
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Church Branches
          </h3>
        </div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center px-2.5 py-0.5 text-sm font-medium text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900 rounded-full"
        >
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {growthRate.toFixed(1)}%
        </motion.div>
      </div>
      <ChurchBranchChart data={allChurchBranches} />
    </motion.div>
  );
};

export default ChurchBranchTrend;