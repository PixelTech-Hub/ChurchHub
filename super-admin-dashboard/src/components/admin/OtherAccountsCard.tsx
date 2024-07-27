import { Button, Card } from "flowbite-react";
import { FC } from "react";

const OtherAccountsCard: FC = function () {
	return (
	  <Card>
		<div className="flow-root">
		  <h3 className="text-xl font-bold dark:text-white">Other accounts</h3>
		  <ul className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
			<li className="py-4">
			  <div className="flex justify-between xl:block 2xl:flex 2xl:space-x-4">
				<div className="flex space-x-4 xl:mb-4 2xl:mb-0">
				  <div>
					<img
					  alt=""
					  src="../../images/users/bonnie-green.png"
					  className="h-6 w-6 rounded-full"
					/>
				  </div>
				  <div className="min-w-0 flex-1">
					<p className="mb-0.5 truncate text-base font-semibold leading-none text-gray-900 dark:text-white">
					  Bonnie Green
					</p>
					<p className="mb-1 truncate text-sm font-normal text-primary-700 dark:text-primary-500">
					  New York, USA
					</p>
					<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
					  Last seen: 1 min ago
					</p>
				  </div>
				</div>
				<div className="inline-flex w-auto items-center xl:w-full 2xl:w-auto">
				  <Button color="gray" href="#">
					Disconnect
				  </Button>
				</div>
			  </div>
			</li>
			<li className="py-4">
			  <div className="flex justify-between xl:block 2xl:flex 2xl:space-x-4">
				<div className="flex space-x-4 xl:mb-4 2xl:mb-0">
				  <div>
					<img
					  alt=""
					  src="../../images/users/jese-leos.png"
					  className="h-6 w-6 rounded-full"
					/>
				  </div>
				  <div className="min-w-0 flex-1">
					<p className="mb-0.5 truncate text-base font-semibold leading-none text-gray-900 dark:text-white">
					  Jese Leos
					</p>
					<p className="mb-1 truncate text-sm font-normal text-primary-700 dark:text-primary-500">
					  California, USA
					</p>
					<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
					  Last seen: 2 min ago
					</p>
				  </div>
				</div>
				<div className="inline-flex w-auto items-center xl:w-full 2xl:w-auto">
				  <Button color="gray" href="#">
					Disconnect
				  </Button>
				</div>
			  </div>
			</li>
			<li className="py-4">
			  <div className="flex justify-between xl:block 2xl:flex 2xl:space-x-4">
				<div className="flex space-x-4 xl:mb-4 2xl:mb-0">
				  <div>
					<img
					  className="h-6 w-6 rounded-full"
					  src="../../images/users/thomas-lean.png"
					  alt=""
					/>
				  </div>
				  <div className="min-w-0 flex-1">
					<p className="mb-0.5 truncate text-base font-semibold leading-none text-gray-900 dark:text-white">
					  Thomas Lean
					</p>
					<p className="mb-1 truncate text-sm font-normal text-primary-700 dark:text-primary-500">
					  Texas, USA
					</p>
					<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
					  Last seen: 1 hour ago
					</p>
				  </div>
				</div>
				<div className="inline-flex w-auto items-center xl:w-full 2xl:w-auto">
				  <Button color="gray" href="#">
					Disconnect
				  </Button>
				</div>
			  </div>
			</li>
			<li className="pt-4">
			  <div className="flex justify-between xl:block 2xl:flex 2xl:space-x-4">
				<div className="flex space-x-4 xl:mb-4 2xl:mb-0">
				  <div>
					<img
					  className="h-6 w-6 rounded-full"
					  src="../../images/users/lana-byrd.png"
					  alt=""
					/>
				  </div>
				  <div className="min-w-0 flex-1">
					<p className="mb-0.5 truncate text-base font-semibold leading-none text-gray-900 dark:text-white">
					  Lana Byrd
					</p>
					<p className="mb-1 truncate text-sm font-normal text-primary-700 dark:text-primary-500">
					  Texas, USA
					</p>
					<p className="text-xs font-medium text-gray-500 dark:text-gray-400">
					  Last seen: 1 hour ago
					</p>
				  </div>
				</div>
				<div className="inline-flex w-auto items-center xl:w-full 2xl:w-auto">
				  <Button color="gray" href="#">
					Disconnect
				  </Button>
				</div>
			  </div>
			</li>
		  </ul>
		  <Button color="primary">Save all</Button>
		</div>
	  </Card>
	);
  };

  export default OtherAccountsCard