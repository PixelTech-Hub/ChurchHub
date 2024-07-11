import { Card } from "flowbite-react";
import { FC } from "react";

const IntroCard: FC = function () {
	return (
		<Card>
			<a
				href="#"
				className="flex items-center text-2xl font-bold dark:text-white"
			>
				<img alt="" src="../../images/logo.svg" className="mr-4 h-11" />
				<span>Okumu Daniel Comboni</span>
			</a>
			<p className="text-base font-normal text-gray-500 dark:text-gray-400">
				Switch your subscription to a different type, such as a monthly plan,
				annual plan, or student plan. And see a list of subscription plans that
				Flowbite offers.
			</p>
			<p className="text-sm font-semibold text-gray-900 dark:text-white">
				Next payment of $36 (yearly) occurs on August 13, 2020.
			</p>
			<div className="space-y-4 sm:flex sm:space-x-3 sm:space-y-0">
				<div>
					<a
						href="#"
						className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
					>
						<svg
							className="-ml-1 mr-2 h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
								clipRule="evenodd"
							/>
						</svg>
						Change Plan
					</a>
				</div>
				<div>
					<a
						href="#"
						className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
					>
						Cancel Subscription
					</a>
				</div>
			</div>
		</Card>
	);
};
export default IntroCard;