import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-day-picker/dist/style.css';
import 'react-phone-input-2/lib/style.css';
import { ChurchStaff } from '../../types/ChurchStaff';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/AuthData';





const initialFormData: ChurchStaff = {
	first_name: '', last_name: '', gender: '', dob: null, disability: false,
	phone_number: '', email: '', residence: '', position: '', marital_status: '',
	account_name: '', account_no: '', baptised: false, churchId: '', career: ''
};

const AddChurchStaffModal: React.FC = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);
	const [formData, setFormData] = useState<ChurchStaff>(initialFormData);
	const [errors, setErrors] = useState<Partial<Record<keyof ChurchStaff, string>>>({});


	const [loading, setLoading] = useState(false);

	const [authData, setAuthData] = useState<AuthData | null>(null);


	// const { data } = useAppSelector((state) => state.auth);
	// const data = localStorage.getItem('auth');
  
	// console.log(data?.churchId);
	// console.log(accessToken);
  
	// console.log('********------*****:', data)
  
  
  
	// console.log('church data', church)
	useEffect(() => {
	  const storedData = localStorage.getItem('auth');
	  if (storedData) {
		try {
		  const parsedData: AuthData = JSON.parse(storedData);
		  setAuthData(parsedData);
		} catch (error) {
		  console.error('Error parsing auth data:', error);
		}
	  }
	}, []);



	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}));
		validateField(name as keyof ChurchStaff, value);
	};

	const handlePhoneChange = (phone: string) => {
		setFormData(prevData => ({ ...prevData, phone_number: phone }));
		validateField('phone_number', phone);
	};

	const handleDobChange = (e: ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value ? new Date(e.target.value) : null;
		setFormData(prevData => ({ ...prevData, dob: date }));
		validateField('dob', date);
	};

	const handleBaptisedChange = (isBaptised: boolean) => {
		setFormData(prevData => ({ ...prevData, baptised: isBaptised }));
		validateField('baptised', isBaptised);
	};

	const handleMaritalStatusChange = (status: string) => {
		setFormData(prevData => ({ ...prevData, marital_status: status }));
		validateField('marital_status', status);
	};


	// const handleDateChange = (date: Date | null) => {
	// 	setFormData(prevData => ({ ...prevData, dob: date }));
	// 	validateField('dob', date);
	// };

	const validateField = (name: keyof ChurchStaff, value: any) => {
		let error = '';
		switch (name) {
			case 'email':
				if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
				break;
			case 'phone_number':
				if (value.length < 10) error = 'Phone number must be at least 10 digits';
				break;
			case 'dob':
				if (!value) error = 'Date of birth is required';
				break;
			case 'position':
				// if (!value.trim()) error = 'This field is required';
				break;
			case 'marital_status':
				// if (!value.trim()) error = 'This field is required';
				break;
			case 'baptised':
				if (value === '') error = 'Please select an option';
				break;
			default:
				if (typeof value === 'string' && !value.trim()) error = 'This field is required';
		}
		setErrors(prev => ({ ...prev, [name]: error }));
		console.log(`Validation ${name}: ${error}`); // Log to check validation errors
	};

	const handleNextStep = () => {
		if (validateStep()) {
			setStep(prevStep => prevStep + 1);
		}
	};

	const handlePrevStep = () => setStep(prevStep => prevStep - 1);

	const validateStep = (): boolean => {
		const currentStepFields = getStepFields(step);
		const stepErrors: Partial<Record<keyof ChurchStaff, string>> = {};
		let isValid = true;

		currentStepFields.forEach(field => {
			const value = formData[field as keyof ChurchStaff];
			validateField(field as keyof ChurchStaff, value);
			if (errors[field as keyof ChurchStaff]) {
				stepErrors[field as keyof ChurchStaff] = errors[field as keyof ChurchStaff];
				isValid = false;
			}
		});

		setErrors(prev => ({ ...prev, ...stepErrors }));
		return isValid;
	};

	const getStepFields = (stepNumber: number): (keyof ChurchStaff)[] => {
		switch (stepNumber) {
			case 1: return ['first_name', 'last_name', 'gender', 'dob'];
			case 2: return ['phone_number', 'email', 'residence'];
			case 3: return ['position', 'marital_status', 'baptised'];
			case 4: return ['account_name', 'account_no', 'career'];
			default: return [];
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('click: submit');
		if (validateStep()) {
			setLoading(true);
	
			// Handle submission logic
			const formDataToSubmit = {
				...formData,
				churchId: authData?.data.churchId,
				dob: formData.dob ? formData.dob.toISOString() : null,
			};
	
			console.log('processing...');
			console.log("++++++++++++", formDataToSubmit);
	
			try {
				const response = await fetch('http://localhost:8000/church-staffs', {
					method: 'POST',
					// headers: {
					// 	'Content-Type': 'application/json',
					// 	//  Authorization: `Bearer ${authData?.accessToken}`
					// },
					body: JSON.stringify(formDataToSubmit),
				});
				if (response.ok) {
					console.log('Form submitted successfully!');
					toast.success('Church staff successfully added');
					setOpen(false);
					setFormData(initialFormData);
					setStep(1);
					setLoading(false); // Make sure to reset loading state if needed
				} else {
					console.error('Submission failed:', response.statusText);
					console.log('Please try again', response.status, response.statusText);
					toast.error('Failed to add church staff****1');
					// Handle error scenarios or display error messages
				}
	
				// if (!response.ok) {
				// 	console.log('error');
				// 	throw new Error(`HTTP error! status: ${response.status}`);
				// }
	
				// const data = await response.json();
				// console.log('Submission successful:', data);
				// toast.success('Church staff successfully added');
				// // Reset form and close modal
				// setFormData(initialFormData);
				// setStep(1);
				// setOpen(false);
			} catch (error) {
				console.error('Submission failed:', error);
				
				toast.error('Failed to add church staff*****2');
				
				setLoading(false);
			} finally {
				setLoading(false);
			}
		} else {
			console.log("Form has errors");
			toast.error('Form has errors');
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
								<Label htmlFor="first_name">First Name</Label>
								<TextInput
									id="first_name"
									name="first_name"
									value={formData.first_name}
									onChange={handleInputChange}
									color={errors.first_name ? 'failure' : undefined}
									helperText={errors.first_name}
									required
								/>
							</div>
							<div>
								<Label htmlFor="last_name">Last Name</Label>
								<TextInput
									id="last_name"
									name="last_name"
									value={formData.last_name}
									onChange={handleInputChange}
									color={errors.last_name ? 'failure' : undefined}
									helperText={errors.last_name}
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
									value={formData.dob ? formData.dob.toISOString().split('T')[0] : ''}
									onChange={handleDobChange}
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
										value={formData.phone_number}
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
								{errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
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
												id={`marital_status-${status}`}
												name="marital_status"
												value={status}
												checked={formData.marital_status === status}
												onChange={() => handleMaritalStatusChange(status)}
												className="mr-2"
											/>
											<Label htmlFor={`marital_status-${status}`}>{status}</Label>
										</div>
									))}
								</div>
								{errors.marital_status && <p className="mt-1 text-sm text-red-500">{errors.marital_status}</p>}
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
												onChange={() => handleBaptisedChange(option.toLowerCase() === 'yes')}
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
								<Label htmlFor="account_name">Account Name</Label>
								<TextInput
									id="account_name"
									name="account_name"
									value={formData.account_name}
									onChange={handleInputChange}
									color={errors.account_name ? 'failure' : undefined}
									helperText={errors.account_name}
									required
								/>
							</div>
							<div className="col-span-2">
								<Label htmlFor="account_no">Account Number</Label>
								<TextInput
									id="account_no"
									name="account_no"
									value={formData.account_no}
									onChange={handleInputChange}
									color={errors.account_no ? 'failure' : undefined}
									helperText={errors.account_no}
									required
								/>
							</div>
							<div className="col-span-2">
								<Label htmlFor="career">Career</Label>
								<TextInput
									id="career"
									name="career"
									value={formData.career}
									onChange={handleInputChange}
									color={errors.career ? 'failure' : undefined}
									helperText={errors.career}
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
								{!loading ? 'Submit' : 'Processing...'}
							</Button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddChurchStaffModal;