import { Button, Card } from "flowbite-react";
import { FC } from "react";
import { HiDesktopComputer, HiDeviceMobile } from "react-icons/hi";

const SessionsCard: FC = function () {
	return (
	  <Card>
		<div className="flow-root">
		  <h3 className="text-xl font-bold dark:text-white">Sessions</h3>
		  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
			<li className="py-4">
			  <div className="flex items-center space-x-4">
				<div className="shrink-0">
				  <HiDesktopComputer className="text-2xl dark:text-white" />
				</div>
				<div className="min-w-0 flex-1">
				  <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
					California 123.123.123.123
				  </p>
				  <p className="truncate text-sm font-normal text-gray-500 dark:text-gray-400">
					Chrome on macOS
				  </p>
				</div>
				<div className="inline-flex items-center">
				  <Button color="gray">Revoke</Button>
				</div>
			  </div>
			</li>
			<li className="pb-6 pt-4">
			  <div className="flex items-center space-x-4">
				<div className="shrink-0">
				  <HiDeviceMobile className="text-2xl dark:text-white" />
				</div>
				<div className="min-w-0 flex-1">
				  <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
					Rome 24.456.355.98
				  </p>
				  <p className="truncate text-sm font-normal text-gray-500 dark:text-gray-400">
					Safari on iPhone
				  </p>
				</div>
				<div className="inline-flex items-center">
				  <Button color="gray">Revoke</Button>
				</div>
			  </div>
			</li>
		  </ul>
		  <Button color="primary">See more</Button>
		</div>
	  </Card>
	);
  };

  export default SessionsCard