import { Button, Card, Label, ToggleSwitch } from "flowbite-react";
import { FC, useState } from "react";

const AlertsNotificationsCard: FC = function () {
	const [isCompanyNews, setCompanyNews] = useState(true);
	const [isAccountActivity, setAccountActivity] = useState(true);
	const [isMeetupsNearYou, setMeetupsNearYou] = useState(true);
	const [isNewMessages, setNewMessages] = useState(false);
  
	return (
	  <Card>
		<div className="flow-root">
		  <h3 className="text-xl font-bold dark:text-white">
			Alerts &amp; Notifications
		  </h3>
		  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
			You can set up Themesberg to get notifications
		  </p>
		  <div className="divide-y divide-gray-200 dark:divide-gray-700">
			<div className="flex items-center justify-between py-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Company News
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Get Themesberg news, announcements, and product updates
				</div>
			  </div>
			  <Label htmlFor="company-news" className="sr-only">
				Toggle company news
			  </Label>
			  <ToggleSwitch
				checked={isCompanyNews}
				id="company-news"
				label=""
				name="company-news"
				onChange={() => setCompanyNews(!isCompanyNews)}
			  />
			</div>
			<div className="flex items-center justify-between py-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Account Activity
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Get important notifications about you or activity you've missed
				</div>
			  </div>
			  <Label htmlFor="account-activity" className="sr-only">
				Toggle account activity
			  </Label>
			  <ToggleSwitch
				checked={isAccountActivity}
				id="account-activity"
				label=""
				name="account-activity"
				onChange={() => setAccountActivity(!isAccountActivity)}
			  />
			</div>
			<div className="flex items-center justify-between py-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Meetups Near You
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Get an email when a Dribbble Meetup is posted close to my
				  location
				</div>
			  </div>
			  <Label htmlFor="meetups-near-you" className="sr-only">
				Toggle meetups near you
			  </Label>
			  <ToggleSwitch
				checked={isMeetupsNearYou}
				id="meetups-near-you"
				label=""
				name="meetups-near-you"
				onChange={() => setMeetupsNearYou(!isMeetupsNearYou)}
			  />
			</div>
			<div className="flex items-center justify-between pt-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  New Messages
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Get Themsberg news, announcements, and product updates
				</div>
			  </div>
			  <Label htmlFor="new-messages" className="sr-only">
				Toggle new messages
			  </Label>
			  <ToggleSwitch
				checked={isNewMessages}
				id="new-messages"
				label=""
				name="new-messages"
				onChange={() => setNewMessages(!isNewMessages)}
			  />
			</div>
		  </div>
		  <div className="mt-6">
			<Button color="primary">Save all</Button>
		  </div>
		</div>
	  </Card>
	);
  };
  export default AlertsNotificationsCard