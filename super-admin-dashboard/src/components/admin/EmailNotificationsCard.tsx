import { Button, Card, Label, ToggleSwitch } from "flowbite-react";
import { FC, useState } from "react";

const EmailNotificationsCard: FC = function () {
	const [isRatingReminders, setRatingReminders] = useState(false);
	const [isItemUpdateNotifications, setItemUpdateNotifications] =
	  useState(true);
	const [isItemCommentNotifications, setItemCommentNotifications] =
	  useState(true);
	const [isBuyerReviewNotifications, setBuyerReviewNotifications] =
	  useState(true);
  
	return (
	  <Card>
		<div className="flow-root">
		  <h3 className="text-xl font-bold dark:text-white">
			Email Notifications
		  </h3>
		  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
			You can set up Themesberg to get email notifications
		  </p>
		  <div className="divide-y divide-gray-200 dark:divide-gray-700">
			<div className="flex items-center justify-between py-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Rating reminders
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Send an email reminding me to rate an item a week after purchase
				</div>
			  </div>
			  <Label htmlFor="rating-reminders" className="sr-only">
				Toggle rating reminders
			  </Label>
			  <ToggleSwitch
				checked={isRatingReminders}
				id="rating-reminders"
				label=""
				name="rating-reminders"
				onChange={() => setRatingReminders(!isRatingReminders)}
			  />
			</div>
			<div className="flex items-center justify-between py-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Item update notifications
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Send user and product notifications for you
				</div>
			  </div>
			  <Label htmlFor="item-update-notifications" className="sr-only">
				Toggle item update notifications
			  </Label>
			  <ToggleSwitch
				checked={isItemUpdateNotifications}
				id="item-update-notifications"
				label=""
				name="item-update-notifications"
				onChange={() =>
				  setItemUpdateNotifications(!isItemUpdateNotifications)
				}
			  />
			</div>
			<div className="flex items-center justify-between py-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Item comment notifications
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Send me an email when someone comments on one of my items
				</div>
			  </div>
			  <Label htmlFor="item-comment-notifications" className="sr-only">
				Toggle item comment notifications
			  </Label>
			  <ToggleSwitch
				checked={isItemCommentNotifications}
				id="item-comment-notifications"
				label=""
				name="item-comment-notifications"
				onChange={() =>
				  setItemCommentNotifications(!isItemCommentNotifications)
				}
			  />
			</div>
			<div className="flex items-center justify-between pt-4">
			  <div className="flex grow flex-col">
				<div className="text-lg font-semibold text-gray-900 dark:text-white">
				  Buyer review notifications
				</div>
				<div className="text-base font-normal text-gray-500 dark:text-gray-400">
				  Send me an email when someone leaves a review with their rating
				</div>
			  </div>
			  <Label htmlFor="buyer-review-notifications" className="sr-only">
				Toggle buyer review notifications
			  </Label>
			  <ToggleSwitch
				checked={isBuyerReviewNotifications}
				id="buyer-review-notifications"
				label=""
				name="buyer-review-notifications"
				onChange={() =>
				  setBuyerReviewNotifications(!isBuyerReviewNotifications)
				}
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

  export default EmailNotificationsCard