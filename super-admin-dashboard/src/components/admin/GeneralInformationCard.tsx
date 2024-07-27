import { Button, Card, Label, TextInput } from "flowbite-react";
import { FC } from "react";

const GeneralInformationCard: FC = function () {
	return (
	  <Card>
		<h3 className="mb-4 text-xl font-bold dark:text-white">
		  General information
		</h3>
		<form action="#">
		  <div className="grid grid-cols-6 gap-6">
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="first-name">First Name</Label>
			  <TextInput
				id="first-name"
				name="first-name"
				placeholder="Bonnie"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="last-name">Last Name</Label>
			  <TextInput
				id="last-name"
				name="last-name"
				placeholder="Green"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="country">Country</Label>
			  <TextInput
				id="country"
				name="country"
				placeholder="United States"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="city">City</Label>
			  <TextInput
				id="city"
				name="city"
				placeholder="San Francisco"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="address">Address</Label>
			  <TextInput
				id="address"
				name="address"
				placeholder="California"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="email">Email</Label>
			  <TextInput
				id="email"
				name="email"
				placeholder="example@company.com"
				required
				type="email"
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="phone-number">Phone Number</Label>
			  <TextInput
				id="phone-number"
				name="phone-number"
				placeholder="e.g., +(12)3456 789"
				required
				type="tel"
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="birthday">Birthday</Label>
			  <TextInput
				id="birthday"
				name="birthday"
				placeholder="e.g., 15/08/1990"
				required
				type="date"
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="organization">Organization</Label>
			  <TextInput
				id="organization"
				name="organization"
				placeholder="Company name"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="role">Role</Label>
			  <TextInput
				id="role"
				name="role"
				placeholder="React Developer"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="department">Department</Label>
			  <TextInput
				id="department"
				name="department"
				placeholder="Development"
				required
			  />
			</div>
			<div className="col-span-6 grid grid-cols-1 gap-y-2 sm:col-span-3">
			  <Label htmlFor="zip-code">ZIP/postal code</Label>
			  <TextInput
				id="zip-code"
				name="zip-code"
				placeholder="12345"
				required
			  />
			</div>
			<div className="col-span-6">
			  <Button color="primary">Save all</Button>
			</div>
		  </div>
		</form>
	  </Card>
	);
  };

  export default GeneralInformationCard