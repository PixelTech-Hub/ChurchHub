import { useEffect, useState } from "react";
import { Users } from "../../types/Users";
import { Churches } from "../../types/Churches";
import { toast } from "react-toastify";
import { CHURCH_ADMIN_SIGNUP_API_URL, CHURCH_API_URL } from "../../app/api";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";


const AddChurchAdminModal = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);

	// Individual state for each form field
	const [fullName, setFullName] = useState("");
	const [title, setTitle] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [churchId, setChurchId] = useState("");
	const [churches, setChurches] = useState<Churches[]>([]);

	const [errors, setErrors] = useState<Partial<Record<keyof Users, string>>>({});
	const [loading, setLoading] = useState(false);



	const validateField = (name: keyof Users, value: any) => {
		let error = '';
		switch (name) {
			case 'email':
				if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
				break;
			case 'name':
				if (!value) error = 'Full name is required';
				break;
			case 'title':
			case 'churchId':
				if (!value) error = 'Select a church atleast is required';
				break;
			case 'title':
				if (!value) error = 'Your title is required';
				break;
			case 'role':
				if (!value) error = 'Gender is required';
				break;
			case 'password':
				if (!value) error = 'Password is required';
				break;
			default:
				if (typeof value === 'string' && !value.trim()) error = 'This field is required';
		}
		setErrors(prev => ({ ...prev, [name]: error }));
	};

	const handleNextStep = () => {
		if (validateStep()) {
			setStep(prevStep => prevStep + 1);
		} else {
			toast.error('Please fill in all required fields before proceeding.');
		}
	};

	const handlePrevStep = () => setStep(prevStep => prevStep - 1);

	const validateStep = (): boolean => {
		const currentStepFields = getStepFields(step);
		const stepErrors: Partial<Record<keyof Users, string>> = {};
		let isValid = true;

		currentStepFields.forEach(field => {
			const value = getValue(field);
			validateField(field, value);
			if (errors[field]) {
				stepErrors[field] = errors[field];
				isValid = false;
			}
		});

		setErrors(prev => ({ ...prev, ...stepErrors }));
		return isValid;
	};

	const getValue = (field: keyof Users) => {
		switch (field) {
			case 'name': return name;
			case 'email': return email;
			case 'churchId': return churchId;
			case 'role': return role;
			case 'title': return title;
			case 'password': return password;
			default: return '';
		}
	};



	const getStepFields = (stepNumber: number): (keyof Users)[] => {
		switch (stepNumber) {
			case 1: return ['name', 'email', 'churchId'];
			case 2: return ['role', 'title', 'password'];
			default: return [];
		}
	};

	useEffect(() => {
		fetchAllChurches();
	}, [churches]);




	const fetchAllChurches = async () => {
		try {
			const response = await fetch(CHURCH_API_URL);
			if (response.ok) {
				const data = await response.json();
				setChurches(data.data);
			} else {
				console.error("Failed to fetch church staffs");
			}
		} catch (error) {
			console.error("Error fetching church staffs:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateStep()) {
			setLoading(true);
			console.log("processing...");
			const formDataToSubmit: Partial<Users> = {
				churchId,
				name: fullName,
				email,
				role,
				title,
				password,
				isEmailVerified: false,
				isEnabled: true,
			};

			// console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));

			try {
				const response = await fetch(CHURCH_ADMIN_SIGNUP_API_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formDataToSubmit),
				});

				if (!response.ok) {
					const errorData = await response.json();
					console.error('Server error response:', errorData);
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				setFullName("")
				setEmail("")
				setRole("")
				setTitle("")
				setPassword("")

				toast.success('Church Admin added successfully');
				setOpen(false);
				// Reset form fields here
			} catch (error) {
				console.error('Submission failed:', error);
				toast.error('Failed to add church admin');
			} finally {
				setLoading(false);
			}
		} else {
			console.log("Form has errors");
			toast.error('Please correct the errors in the form');
		}
	};






	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<>
						<h3 className="mb-4 text-lg font-medium">Personal Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className='col-span-2'>
								<Label htmlFor="fullName">Full Name</Label>
								<TextInput
									id="fullName"
									name="fullName"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									color={errors.name ? 'failure' : undefined}
									helperText={errors.name}
									required
								/>
							</div>
							<div className="col-span-2">
								<Label htmlFor="email">Email Address</Label>
								<TextInput
									id="email"
									name="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									color={errors.email ? 'failure' : undefined}
									helperText={errors.email}
									required
								/>
							</div>
							<div className="col-span-2">
								{/* {churches?.map((item) => {
									if (typeof item.id === 'string') {
										return (
											<div key={item.id} className="flex items-center">
												<input
													type="checkbox"
													id={`church-${item.id}`}
													name="church"
													value={item.id}
													onChange={() => setChurchId(item.id as string)}
													className="mr-2"
												/>
												<Label htmlFor={`church-${item.id}`}>{item.name}</Label>
											</div>
										);
									}
									return null;
								})} */}
								<Select
									id="church"
									name="church"
									value={churchId}
									onChange={(e) => setChurchId(e.target.value)}
									required
								>
									<option value="">Select Church</option>
									{churches?.map((item) => (
										<option 
											value={item.id} key={item.id}>
												{item.name}
											</option>
									))}

								</Select>
							</div>
							{errors.churchId && (
								<p className="mt-1 text-sm text-red-500">
									{errors.churchId}
								</p>
							)}

						</div>
					</>
				);
			case 2:
				return (
					<>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-2">
								<Label>Role</Label>
								<div className="flex gap-4 mt-2">
									{['super admin', 'admin', 'editor', 'viewer'].map((status) => (
										<div key={status} className="flex items-center">
											<input
												type="radio"
												id={`role-${status}`}
												name="role"
												value={status}
												checked={role === status}
												onChange={() => setRole(status)}
												className="mr-2"
											/>
											<Label htmlFor={`marital_status-${status}`}>{status}</Label>
										</div>
									))}
								</div>
								{errors.role &&
									<p className="mt-1 text-sm text-red-500">{errors.role}</p>
								}
							</div>
							<div className='mt-4'>
								<Label htmlFor="title">Title</Label>
								<TextInput
									id="title"
									name="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									color={errors.title ? 'failure' : undefined}
									helperText={errors.title}
									required
								/>
							</div>
							{errors.title &&
								<p className="mt-1 text-sm text-red-500">{errors.title}</p>
							}
							<div className='mt-4'>
								<Label htmlFor="password">Password</Label>
								<TextInput
									id="password"
									name="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									color={errors.password ? 'failure' : undefined}
									helperText={errors.password}
									required
								/>
							</div>
							{errors.password &&
								<p className="mt-1 text-sm text-red-500">{errors.password}</p>
							}
						</div>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<Button color="primary" onClick={() => setOpen(true)}>
				<FaPlus className="mr-3 text-sm" />
				Add Church Admin
			</Button>
			<Modal show={isOpen} onClose={() => setOpen(false)} size="xl">
				<Modal.Header>Add Church Admin</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						{renderStep()}
					</form>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex justify-between w-full">
						{step > 1 && (
							<Button color="light" onClick={handlePrevStep}>
								Previous
							</Button>
						)}
						{step < 2 ? (
							<Button color="primary" onClick={handleNextStep}>
								Next
							</Button>
						) : (
							<Button color="success" onClick={handleSubmit}>
								{!loading ? 'Submit' : 'Processing...'}
							</Button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AddChurchAdminModal