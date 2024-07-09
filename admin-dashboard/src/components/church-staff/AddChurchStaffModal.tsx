import React, { useState, ChangeEvent } from 'react';
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-day-picker/dist/style.css';
import 'react-phone-input-2/lib/style.css';

interface FormData {
	firstName: string;
	lastName: string;
	gender: string;
	dob: Date | null;
	disability: boolean;
	phoneNumber: string;
	email: string;
	residence: string;
	position: string;
	maritalStatus: string;
	accountName: string;
	accountNo: string;
	baptised: boolean;
}

const initialFormData: FormData = {
	firstName: '', lastName: '', gender: '', dob: null, disability: false,
	phoneNumber: '', email: '', residence: '', position: '', maritalStatus: '',
	accountName: '', accountNo: '', baptised: false,
};

const AddChurchStaffModal: React.FC = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});


	const [loading, setLoading] = useState(false);



	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}));
		validateField(name as keyof FormData, value);
	};

	const handlePhoneChange = (phone: string) => {
		setFormData(prevData => ({ ...prevData, phoneNumber: phone }));
		validateField('phoneNumber', phone);
	};

	// const handleDateChange = (date: Date | null) => {
	// 	setFormData(prevData => ({ ...prevData, dob: date }));
	// 	validateField('dob', date);
	// };

	const validateField = (name: keyof FormData, value: any) => {
		let error = '';
		switch (name) {
			case 'email':
				if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
				break;
			case 'phoneNumber':
				if (value.length < 10) error = 'Phone number must be at least 10 digits';
				break;
			case 'dob':
				if (!value) error = 'Date of birth is required';
				break;
			case 'position':
				if (!value.trim()) error = 'This field is required';
				break;
			case 'maritalStatus':
				if (!value.trim()) error = 'This field is required';
				break;
			case 'baptised':
				if (value === '') error = 'Please select an option';
				break;
			default:
				if (typeof value === 'string' && !value.trim()) error = 'This field is required';
		}
		setErrors(prev => ({ ...prev, [name]: error }));
	};

	const handleNextStep = () => {
		if (validateStep()) {
			setStep(prevStep => prevStep + 1);
		}
	};

	const handlePrevStep = () => setStep(prevStep => prevStep - 1);

	const validateStep = (): boolean => {
		const currentStepFields = getStepFields(step);
		const stepErrors: Partial<Record<keyof FormData, string>> = {};
		let isValid = true;

		currentStepFields.forEach(field => {
			const value = formData[field as keyof FormData];
			validateField(field as keyof FormData, value);
			if (errors[field as keyof FormData]) {
				stepErrors[field as keyof FormData] = errors[field as keyof FormData];
				isValid = false;
			}
		});

		setErrors(prev => ({ ...prev, ...stepErrors }));
		return isValid;
	};

	const getStepFields = (stepNumber: number): (keyof FormData)[] => {
		switch (stepNumber) {
			case 1: return ['firstName', 'lastName', 'gender', 'dob'];
			case 2: return ['phoneNumber', 'email', 'residence'];
			case 3: return ['position', 'maritalStatus', 'baptised'];
			case 4: return ['accountName', 'accountNo'];
			default: return [];
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateStep()) {
			// Submit logic here
			console.log(formData);
			setOpen(false);
			setFormData(initialFormData);
			setStep(1);
		}
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<>
						<h3 className="mb-4 text-lg font-medium">Personal Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="firstName">First Name</Label>
								<TextInput
									id="firstName"
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									color={errors.firstName ? 'failure' : undefined}
									helperText={errors.firstName}
									required
								/>
							</div>
							<div>
								<Label htmlFor="lastName">Last Name</Label>
								<TextInput
									id="lastName"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									color={errors.lastName ? 'failure' : undefined}
									helperText={errors.lastName}
									required
								/>
							</div>
							<div>
								<Label htmlFor="gender">Gender</Label>
								<Select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleInputChange}
									required
								>
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</Select>
							</div>
							<div>
								<Label htmlFor="dob">Date of Birth</Label>
								<TextInput
									id="dob"
									name="dob"
									type="date"
									className="mt-1"
								/>
							</div>
						</div>
					</>
				);
			case 2:
				return (
					<>
						<h3 className="mb-4 text-lg font-medium">Contact Details</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-2 sm:col-span-1">
								<Label htmlFor="phoneNumber">Phone Number</Label>
								<div className="phone-input-container">
									<PhoneInput
										country={'ug'}
										value={formData.phoneNumber}
										onChange={handlePhoneChange}
										inputProps={{
											name: 'phoneNumber',
											required: true,
										}}
										containerClass="w-full"
										inputClass="w-full rounded-lg border border-gray-300 p-2.5 pl-14" // Adjusted padding-left
										buttonClass="absolute top-0 left-0 h-full"
									/>
								</div>
								{errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
							</div>
							<div className="col-span-2 sm:col-span-1">
								<Label htmlFor="email">Email Address</Label>
								<TextInput
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									color={errors.email ? 'failure' : undefined}
									helperText={errors.email}
									required
								/>
							</div>
							<div className="col-span-2">
								<Label htmlFor="residence">Residence</Label>
								<TextInput
									id="residence"
									name="residence"
									value={formData.residence}
									onChange={handleInputChange}
									color={errors.residence ? 'failure' : undefined}
									helperText={errors.residence}
									required
								/>
							</div>
						</div>
					</>
				);
			case 3:
				return (
					<>
						<h3 className="mb-4 text-lg font-medium">Other Details</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-2">
								<Label htmlFor="position">Position</Label>
								<TextInput
									id="position"
									name="position"
									value={formData.position}
									onChange={handleInputChange}
									color={errors.position ? 'failure' : undefined}
									helperText={errors.position}
									required
								/>
							</div>
							<div className="">
								<Label>Marital Status</Label>
								<div className="flex gap-4 mt-2">
									{['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
										<div key={status} className="flex items-center">
											<input
												type="radio"
												id={`maritalStatus-${status.toLowerCase()}`}
												name="maritalStatus"
												value={status.toLowerCase()}
												checked={formData.maritalStatus === status.toLowerCase()}
												onChange={handleInputChange}
												className="mr-2"
											/>
											<Label htmlFor={`maritalStatus-${status.toLowerCase()}`}>{status}</Label>
										</div>
									))}
								</div>
								{errors.maritalStatus && <p className="mt-1 text-sm text-red-500">{errors.maritalStatus}</p>}
							</div>
							<div className="col-span-2">
								<Label>Baptised</Label>
								<div className="flex gap-4 mt-2">
									{['Yes', 'No'].map((option) => (
										<div key={option} className="flex items-center">
											<input
												type="radio"
												id={`baptised-${option.toLowerCase()}`}
												name="baptised"
												// value={option.toLowerCase() === 'yes'}
												checked={formData.baptised === (option.toLowerCase() === 'yes')}
												// onChange={(e) => handleInputChange({
												// 	...e,
												// 	target: { ...e.target, value: e.target.value === 'true' }
												// } as ChangeEvent<HTMLInputElement>)}
												className="mr-2"
											/>
											<Label htmlFor={`baptised-${option.toLowerCase()}`}>{option}</Label>
										</div>
									))}
								</div>
								{errors.baptised && <p className="mt-1 text-sm text-red-500">{errors.baptised}</p>}
							</div>
						</div>
					</>
				);
			// Add cases for steps 3 and 4
			case 4:
				return (
					<>
						<h3 className="mb-4 text-lg font-medium">Account Details</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-2">
								<Label htmlFor="residence">Account Name</Label>
								<TextInput
									id="accountName"
									name="accountName"
									value={formData.accountName}
									onChange={handleInputChange}
									color={errors.accountName ? 'failure' : undefined}
									helperText={errors.accountName}
									required
								/>
							</div>
							<div className="col-span-2">
								<Label htmlFor="residence">Account Number</Label>
								<TextInput
									id="accountNo"
									name="accountNo"
									value={formData.accountNo}
									onChange={handleInputChange}
									color={errors.accountNo ? 'failure' : undefined}
									helperText={errors.accountNo}
									required
								/>
							</div>
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
				Add Church Staff
			</Button>
			<Modal show={isOpen} onClose={() => setOpen(false)} size="xl">
				<Modal.Header>Add Church Staff</Modal.Header>
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
						{step < 4 ? (
							<Button color="primary" onClick={handleNextStep}>
								Next
							</Button>
						) : (
							<Button color="success" onClick={handleSubmit}>
								{loading ? 'Please wait...' : 'Submit'}
							</Button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddChurchStaffModal;