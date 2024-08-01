import { FC, useState } from "react";
import { Dropdown } from "flowbite-react";
import { FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Datepicker: FC = function () {
  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  const dateRanges = [
    { label: "Yesterday", value: "Yesterday" },
    { label: "Today", value: "Today" },
    { label: "Last 7 days", value: "Last 7 days" },
    { label: "Last 30 days", value: "Last 30 days" },
    { label: "Last 90 days", value: "Last 90 days" },
    { label: "Custom...", value: "Custom" },
  ];

  const handleRangeSelect = (range: string) => {
    setSelectedRange(range);
    // Here you can add logic to update the date range in your parent component or state management
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <FaCalendarAlt className="mr-2 text-gray-600 dark:text-gray-400" />
      <Dropdown
        inline
        label={
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {selectedRange}
          </span>
        }
      >
        <Dropdown.Header>
          <span className="block text-sm font-medium text-gray-900 dark:text-white">
            Select Date Range
          </span>
        </Dropdown.Header>
        {dateRanges.map((range) => (
          <Dropdown.Item
            key={range.value}
            onClick={() => handleRangeSelect(range.value)}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`block px-4 py-2 text-sm ${
                selectedRange === range.value
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-600 dark:text-white"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {range.label}
            </motion.span>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </motion.div>
  );
};

export default Datepicker;