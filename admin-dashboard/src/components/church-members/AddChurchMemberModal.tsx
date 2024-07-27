import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-day-picker/dist/style.css';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/AuthData';
import { ChurchMembers } from '../../types/ChurchMember';
import { ChurchMinistries } from '../../types/ChurchMinistries';


const AddChurchMemberModal = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);

	// Individual state for each form field
	const [fullName, setFullName] = useState("");
	const [gender, setGender] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [job, setJob] = useState("");
	const [residence, setResidence] = useState("");
	const [age, setAge] = useState("");
	const [maritalStatus, setMaritalStatus] = useState("");
	const [NoOfchildren, setNoOfChildren] = useState("");
	const [education, setEducation] = useState("");
	const [ministry, setMinistry] = useState<ChurchMinistries[]>([]);
	const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);

	const [errors, setErrors] = useState<Partial<Record<keyof ChurchMembers, string>>>({});
	const [loading, setLoading] = useState(false);
	const [authData, setAuthData] = useState<AuthData | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem('userData');
		if (storedData) {
			try {
				const parsedData: AuthData = JSON.parse(storedData);
				setAuthData(parsedData);
			} catch (error) {
				console.error('Error parsing auth data:', error);
			}
		}
	}, []);

	const validateField = (name: keyof ChurchMembers, value: any) => {
		let error = '';
		switch (name) {
			case 'email':
				if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
				break;
			case 'full_name':
				if (!value) error = 'Full name is required';
				break;
			case 'phone_number':
				if (value.length < 10) error = 'Phone number must be at least 10 digits';
				break;
			case 'gender':
				if (!value) error = 'Gender is required';
				break;
			case 'job':
				if (!value) error = 'Job is required';
				break;
			case 'residence':
				if (!value) error = 'Residence is required';
				break;
			case 'age':
				if (!value) error = 'Age range is required';
				break;
			case 'marital_status':
				if (!value) error = 'Select one atleast is required';
				break;
			case 'no_of_children':
				if (!value) error = 'Select one atleast is required';
				break;
			case 'church_ministries_ids':
				if (value.length === 0) error = 'Select at least one ministry';
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
		const stepErrors: Partial<Record<keyof ChurchMembers, string>> = {};
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

	const getValue = (field: keyof ChurchMembers) => {
		switch (field) {
			case 'full_name': return fullName;
			case 'phone_number': return phoneNumber;
			case 'email': return email;
			case 'gender': return gender;
			case 'job': return job;
			case 'residence': return residence;
			case 'age': return age;
			case 'no_of_children': return NoOfchildren;
			case 'marital_status': return maritalStatus;
			case 'education_level': return education;
			case 'church_ministries_ids': return selectedMinistries;
			default: return '';
		}
	};



	const getStepFields = (stepNumber: number): (keyof ChurchMembers)[] => {
		switch (stepNumber) {
			case 1: return ['full_name', 'gender', 'email', 'phone_number'];
			case 2: return ['marital_status', 'age', 'job', 'no_of_children'];
			case 3: return ['residence', 'education_level'];
			case 4: return ['church_ministries_ids'];
			default: return [];
		}
	};

	const handleMinistryChange = (ministryId: string) => {
		setSelectedMinistries(prev => {
			if (prev.includes(ministryId)) {
				return prev.filter(id => id !== ministryId);
			} else {
				return [...prev, ministryId];
			}
		});
	};
	useEffect(() => {
		fetchChurchMinistries();
	}, [ministry]);

	const fetchChurchMinistries = async () => {
		try {
			const response = await fetch("http://localhost:8000/church_ministries");
			if (response.ok) {
				const data = await response.json();
				setMinistry(data.data); // Assuming data.data contains the array of church staffs
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
			const formDataToSubmit: Partial<ChurchMembers> = {
				churchId: authData?.churchId || '',
				full_name: fullName,
				gender: gender,
				phone_number: phoneNumber,
				email: email,
				job,
				residence,
				age,
				marital_status: maritalStatus,
				no_of_children: NoOfchildren,
				education_level: education,
				church_ministries_ids: selectedMinistries
			};

			console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));

			try {
				const response = await fetch('http://localhost:8000/church-members', {
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
				setGender("")
				setPhoneNumber("")
				setEmail("")
				setJob("")
				setResidence("")
				setAge("")
				setMaritalStatus("")
				setNoOfChildren("")
				setEducation("")
				setMinistry([])
				setSelectedMinistries([])
				
				toast.success('Church staff added successfully');
				setOpen(false);
				// Reset form fields here
			} catch (error) {
				console.error('Submission failed:', error);
				toast.error('Failed to add church staff');
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
									color={errors.full_name ? 'failure' : undefined}
									helperText={errors.full_name}
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
							<div className=''>
								<Label htmlFor="gender">Gender</Label>
								<Select
									id="gender"
									name="gender"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									required
								>
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="rather not say">Other</option>
								</Select>
							</div>

							<div className="col-span-2 sm:col-span-1">
								<Label htmlFor="phoneNumber">Phone Number</Label>
								<div className="phone-input-container">
									<PhoneInput
										country={'ug'}
										value={phoneNumber}
										onChange={(phone) => setPhoneNumber(phone)}
										inputProps={{
											name: 'phoneNumber',
											required: true,
										}}
										containerClass="w-full"
										inputClass="w-full rounded-lg border border-gray-300 p-2.5 pl-14"
										buttonClass="absolute top-0 left-0 h-full"
									/>
								</div>
								{errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
							</div>
						</div>
					</>
				);
			case 2:
				return (
					<>
						<h3 className="mb-4 text-lg font-medium">Family Details</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="col-span-2">
								<Label>Marital Status</Label>
								<div className="flex gap-4 mt-2">
									{['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
										<div key={status} className="flex items-center">
											<input
												type="radio"
												id={`marital_status-${status}`}
												name="marital_status"
												value={status}
												checked={maritalStatus === status}
												onChange={() => setMaritalStatus(status)}
												className="mr-2"
											/>
											<Label htmlFor={`marital_status-${status}`}>{status}</Label>
										</div>
									))}
								</div>
								{errors.marital_status && <p className="mt-1 text-sm text-red-500">{errors.marital_status}</p>}
							</div>
							<div className="col-span-2">
								<Label>Age Range</Label>
								<div className="flex gap-4 mt-2">
									{['16-25', '26-35', '36-45', '46-55', '56-above'].map((status) => (
										<div key={status} className="flex items-center">
											<input
												type="radio"
												id={`age-${status}`}
												name="age"
												value={status}
												checked={age === status}
												onChange={() => setAge(status)}
												className="mr-2"
											/>
											<Label htmlFor={`age-${status}`}>{status}</Label>
										</div>
									))}
								</div>
								{errors.age && (
									<p className="mt-1 text-sm text-red-500">{errors.age}</p>
								)}
							</div>
							<div className='mt-4'>
								<Label htmlFor="job">Career</Label>
								<TextInput
									id="job"
									name="job"
									value={job}
									onChange={(e) => setJob(e.target.value)}
									color={errors.job ? 'failure' : undefined}
									helperText={errors.job}
									required
								/>
							</div>
							<div className='mt-4'>
								<Label htmlFor="children">No of Children</Label>
								<TextInput
									id="children"
									name="children"
									value={NoOfchildren}
									onChange={(e) => setNoOfChildren(e.target.value)}
									color={errors.no_of_children ? 'failure' : undefined}
									helperText={errors.no_of_children}
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
								<Label htmlFor="residence">Residence</Label>
								<TextInput
									id="residence"
									name="residence"
									value={residence}
									onChange={(e) => setResidence(e.target.value)}
									color={errors.residence ? 'failure' : undefined}
									helperText={errors.residence}
									required
								/>
							</div>
							<div className="col-span-2">
								<Label>Education</Label>
								<div className="flex gap-4 mt-2">
									{['not educated', 'Primary', 'Secondary', 'University', 'Institution'].map((status) => (
										<div key={status} className="flex items-center">
											<input
												type="radio"
												id={`education_level-${status}`}
												name="education_level"
												value={status}
												checked={education === status}
												onChange={() => setEducation(status)}
												className="mr-2"
											/>
											<Label htmlFor={`education_level-${status}`}>{status}</Label>
										</div>
									))}
								</div>
								{errors.education_level && <p className="mt-1 text-sm text-red-500">{errors.education_level}</p>}
							</div>

						</div>
					</>
				);
			case 4:
				return (
					<div>
						<h3 className="mb-4 text-lg font-medium">Church Ministries</h3>
						<div className="col-span-2">
							<div className="flex flex-col gap-4 mt-2">
								{ministry?.map((item) => {
									if (typeof item.id === 'string') {
										return (
											<div key={item.id} className="flex items-center">
												<input
													type="checkbox"
													id={`ministry-${item.id}`}
													name="church_ministries_ids"
													value={item.id}
													checked={selectedMinistries.includes(item.id)}
													onChange={() => handleMinistryChange(item.id as string)}
													className="mr-2"
												/>
												<Label htmlFor={`ministry-${item.id}`}>{item.name}</Label>
											</div>
										);
									}
									return null;
								})}
							</div>
							{errors.church_ministries_ids && (
								<p className="mt-1 text-sm text-red-500">
									{errors.church_ministries_ids}
								</p>
							)}
						</div>

					</div>

				);
			default:
				return null;
		}
	};

	return (
		<>
			<Button color="primary" onClick={() => setOpen(true)}>
				<FaPlus className="mr-3 text-sm" />
				Add Church Member
			</Button>
			<Modal show={isOpen} onClose={() => setOpen(false)} size="xl">
				<Modal.Header>Add Church Member</Modal.Header>
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

export default AddChurchMemberModal