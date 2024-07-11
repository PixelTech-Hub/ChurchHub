import { FC } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";

const CardDetailsCard: FC = function () {
	return (
		<Card>
			<h3 className="mb-4 text-xl font-bold dark:text-white">Card Details</h3>
			<form>
				<div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div className="grid grid-cols-1 gap-y-2">
						<Label htmlFor="full-name">(Full name as displayed on card)*</Label>
						<TextInput
							id="full-name"
							name="full-name"
							placeholder="Enter your name"
							required
						/>
					</div>
					<div className="grid grid-cols-1 gap-y-2">
						<Label htmlFor="card-number">Card Number *</Label>
						<TextInput
							id="card-number"
							name="card-number"
							placeholder="xxxx-xxxx-xxxx-xxxx"
							required
						/>
					</div>
					<div className="grid grid-cols-1 gap-y-2">
						<Label htmlFor="cvc">CVC *</Label>
						<TextInput id="cvc" name="cvc" placeholder="•••" required />
					</div>
					<div className="grid grid-cols-1 gap-y-2">
						<Label htmlFor="zip">Postal / ZIP code (optional)</Label>
						<TextInput id="zip" name="zip" placeholder="e.g. 12345" required />
					</div>
				</div>
				<Button color="primary">Update</Button>
			</form>
		</Card>
	);
};

export default CardDetailsCard;