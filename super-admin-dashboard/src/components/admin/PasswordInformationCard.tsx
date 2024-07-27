import { Button, Card, Label, TextInput } from "flowbite-react";
import { FC } from "react";

const PasswordInformationCard: FC = function () {
	return (
	  <Card>
		<h3 className="mb-4 text-xl font-bold dark:text-white">
		  Password information
		</h3>
		<form action="#">
		  <div className="grid grid-cols-6 gap-6">
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="current-password">Current password</Label>
			  <TextInput
				id="current-password"
				name="current-password"
				placeholder="••••••••"
				type="password"
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="new-password">New password</Label>
			  <TextInput
				id="new-password"
				name="new-password"
				placeholder="••••••••"
				type="password"
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="confirm-password">Confirm password</Label>
			  <TextInput
				id="confirm-password"
				name="confirm-password"
				placeholder="••••••••"
				type="password"
			  />
			</div>
			<div className="col-span-full">
			  <div className="text-sm font-medium dark:text-white">
				Password requirements:
			  </div>
			  <div className="mb-1 text-sm font-normal text-gray-500 dark:text-gray-400">
				Ensure that these requirements are met:
			  </div>
			  <ul className="space-y-1 pl-4 text-gray-500 dark:text-gray-400">
				<li className="text-xs font-normal">
				  At least 10 characters (and up to 100 characters)
				</li>
				<li className="text-xs font-normal">
				  At least one lowercase character
				</li>
				<li className="text-xs font-normal">
				  Inclusion of at least one special character, e.g., ! @ # ?
				</li>
				<li className="text-xs font-normal">Some text here zoltan</li>
			  </ul>
			</div>
			<div className="col-span-6">
			  <Button color="primary">Save all</Button>
			</div>
		  </div>
		</form>
	  </Card>
	);
  };
  export default PasswordInformationCard