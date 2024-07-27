import { Button, Card } from "flowbite-react";
import { FC } from "react";
import { FaDribbble, FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";

const SocialAccountsCard: FC = function () {
	return (
	  <Card>
		<div className="flow-root">
		  <h3 className="text-xl font-bold dark:text-white">Social accounts</h3>
		  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
			<li className="py-4">
			  <div className="flex items-center space-x-4">
				<div className="shrink-0">
				  <FaFacebookF className="text-xl dark:text-white" />
				</div>
				<div className="min-w-0 flex-1">
				  <span className="block truncate text-base font-semibold text-gray-900 dark:text-white">
					Facebook account
				  </span>
				  <a
					href="#"
					className="block truncate text-sm font-normal text-primary-700 hover:underline dark:text-primary-500"
				  >
					www.facebook.com/themesberg
				  </a>
				</div>
				<div className="inline-flex items-center">
				  <Button color="gray" href="#">
					Disconnect
				  </Button>
				</div>
			  </div>
			</li>
			<li className="py-4">
			  <div className="flex items-center space-x-4">
				<div className="shrink-0">
				  <FaTwitter className="text-xl dark:text-white" />
				</div>
				<div className="min-w-0 flex-1">
				  <span className="block truncate text-base font-semibold text-gray-900 dark:text-white">
					Twitter account
				  </span>
				  <a
					href="#"
					className="block truncate text-sm font-normal text-primary-700 hover:underline dark:text-primary-500"
				  >
					www.twitter.com/themesberg
				  </a>
				</div>
				<div className="inline-flex items-center">
				  <Button color="gray" href="#">
					Disconnect
				  </Button>
				</div>
			  </div>
			</li>
			<li className="py-4">
			  <div className="flex items-center space-x-4">
				<div className="shrink-0">
				  <FaGithub className="text-xl dark:text-white" />
				</div>
				<div className="min-w-0 flex-1">
				  <span className="block truncate text-base font-semibold text-gray-900 dark:text-white">
					Github account
				  </span>
				  <span className="block truncate text-sm font-normal text-gray-500 dark:text-gray-400">
					Not connected
				  </span>
				</div>
				<div className="inline-flex items-center">
				  <Button color="primary" href="#">
					Connect
				  </Button>
				</div>
			  </div>
			</li>
			<li className="pb-6 pt-4">
			  <div className="flex items-center space-x-4">
				<div className="shrink-0">
				  <FaDribbble className="text-xl dark:text-white" />
				</div>
				<div className="min-w-0 flex-1">
				  <span className="block truncate text-base font-semibold text-gray-900 dark:text-white">
					Dribbble account
				  </span>
				  <span className="block truncate text-sm font-normal text-gray-500 dark:text-gray-400">
					Not connected
				  </span>
				</div>
				<div className="inline-flex items-center">
				  <Button color="primary" href="#">
					Connect
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

  export default SocialAccountsCard