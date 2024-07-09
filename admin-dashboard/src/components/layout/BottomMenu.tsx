import { Tooltip } from "flowbite-react";
import { FC } from "react";
import { HiCog } from "react-icons/hi";

const BottomMenu: FC = function () {
	return (
	  <div className="flex items-center justify-center gap-x-5">
		{/* <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
		  <span className="sr-only">Tweaks</span>
		  <HiAdjustments className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
		</button> */}
		<div>
		  <Tooltip content="Settings page">
			<a
			  href="/users/settings"
			  className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 gap-2 dark:hover:text-white"
			>
			  <span className="sr-only">Settings</span>
			  <HiCog className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
  
			</a>
		  </Tooltip>
		</div>
		{/* <div>
		  <LanguageDropdown />
		</div> */}
	  </div>
	);
  };
  export default BottomMenu;