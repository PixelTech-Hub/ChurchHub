import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

interface GeneralInfoCardProps {
	staff: any;
	onUpdate: (updatedStaff: any) => void;
}



const GeneralInfoCard: FC<GeneralInfoCardProps> = function ({ staff, onUpdate }) {

	const church = useAppSelector(state => state.church.userChurch)
	// const [loading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		residence: "",
		role: "",
		country: "",
		email: "",
		info: "",
	});

	useEffect(() => {
		if (staff) {
			setFormData({
				first_name: staff.first_name || "",
				last_name: staff.last_name || "",
				residence: staff.residence || "",
				role: staff.position || "",
				country: staff.country || "",
				email: staff.email || "",
				info: staff.info || "",
			});
		}
	}, [staff]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		onUpdate(formData);
	};



	return (
		<Card>
			<h3 className="mb-4 text-xl font-bold dark:text-white">
				General Information
			</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="col-span-1 grid grid-cols-1 gap-y-3">
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="first_name">First Name</Label>
							<TextInput
								id="first_name"
								name="first_name"
								value={formData.first_name}
								onChange={handleInputChange}
								placeholder="Bonnie"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="organization">Organization</Label>
							<TextInput
								id="organization"
								name="organization"
								value={church?.name || ''}
							/>
						</div>
						
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="residence">Residence</Label>
							<TextInput
								id="residence"
								name="residence"
								value={formData.residence}
								onChange={handleInputChange}
								placeholder="eg., Gulu"
								required
							/>
						</div>
					</div>
					<div className="col-span-1 grid grid-cols-1 gap-y-3">
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="last_name">Last name</Label>
							<TextInput
								id="last_name"
								name="last_name"
								value={formData.last_name}
								onChange={handleInputChange}
								placeholder="Green"
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="role">Role</Label>
							<TextInput
								id="role"
								name="role"
								value={formData.role}
								onChange={handleInputChange}
								placeholder="React Developer"
								required
							/>
						</div>
						
						<div className="grid grid-cols-1 gap-y-2">
							<Label htmlFor="email">Email</Label>
							<TextInput
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
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
							value={formData.info}
							onChange={handleInputChange}
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