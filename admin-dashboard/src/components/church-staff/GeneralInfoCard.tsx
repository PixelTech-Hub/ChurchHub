import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import { FC } from "react";

const GeneralInfoCard: FC = function () {
	return (
		<Card>
			<h3 className="mb-4 text-xl font-bold dark:text-white">
				General Information
			</h3>
			<form>
				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="col-span-1 grid grid-cols-1 gap-y-3">
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="first-name">First Name</Label>
							<TextInput
								id="first-name"
								name="first-name"
								placeholder="Bonnie"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="organization">Organization</Label>
							<TextInput
								id="organization"
								name="organization"
								placeholder="Company name"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="department">Department</Label>
							<TextInput
								id="department"
								name="department"
								placeholder="Development"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="city">City</Label>
							<TextInput
								id="city"
								name="city"
								placeholder="eg., San Francisco"
								required
							/>
						</div>
					</div>
					<div className="col-span-1 grid grid-cols-1 gap-y-3">
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="last-name">Last name</Label>
							<TextInput
								id="last-name"
								name="last-name"
								placeholder="Green"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="role">Role</Label>
							<TextInput
								id="role"
								name="role"
								placeholder="React Developer"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="country">Country</Label>
							<TextInput
								id="country"
								name="country"
								placeholder="United States"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="email">Email</Label>
							<TextInput
								id="email"
								name="email"
								placeholder="example@company.com"
								required
							/>
						</div>
					</div>
					<div className="col-span-1 grid grid-cols-1 gap-y-2">
						<Label htmlFor="info">Info</Label>
						<Textarea
							id="info"
							name="info"
							placeholder="Receipt Info (optional)"
							rows={12}
						/>
					</div>
				</div>
				<Button type="submit">Update</Button>
			</form>
		</Card>
	);
};
export default GeneralInfoCard;