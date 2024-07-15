import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-day-picker/dist/style.css';
import 'react-phone-input-2/lib/style.css';
import { ChurchStaff } from '../../types/ChurchStaff';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/AuthData';






const AddChurchStaffModal: React.FC = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    // Individual state for each form field
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [disability, setDisability] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [residence, setResidence] = useState("");
    const [position, setPosition] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
	const [baptised, setBaptised] = useState<boolean | undefined>(undefined);
    const [accountName, setAccountName] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [career, setCareer] = useState("");

    const [errors, setErrors] = useState<Partial<Record<keyof ChurchStaff, string>>>({});
    const [loading, setLoading] = useState(false);
    const [authData, setAuthData] = useState<AuthData | null>(null);

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
                if (!value.trim()) error = 'Position is required';
                break;
            case 'marital_status':
                if (!value.trim()) error = 'Marital status is required';
                break;
            case 'baptised':
                if (value === null) error = 'Please select an option';
                break;
            case 'account_name':
            case 'account_no':
            case 'career':
                if (!value.trim()) error = 'This field is required';
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
        const stepErrors: Partial<Record<keyof ChurchStaff, string>> = {};
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

    const getValue = (field: keyof ChurchStaff) => {
        switch (field) {
            case 'first_name': return firstName;
            case 'last_name': return lastName;
            case 'gender': return gender;
            case 'dob': return dob;
            case 'disability': return disability;
            case 'phone_number': return phoneNumber;
            case 'email': return email;
            case 'residence': return residence;
            case 'position': return position;
            case 'marital_status': return maritalStatus;
            case 'baptised': return baptised;
            case 'account_name': return accountName;
            case 'account_no': return accountNo;
            case 'career': return career;
            default: return '';
        }
    };

    const getStepFields = (stepNumber: number): (keyof ChurchStaff)[] => {
        switch (stepNumber) {
            case 1: return ['first_name', 'last_name', 'gender', 'dob', 'disability'];
            case 2: return ['phone_number', 'email', 'residence'];
            case 3: return ['position', 'marital_status', 'baptised'];
            case 4: return ['account_name', 'account_no', 'career'];
            default: return [];
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep()) {
            setLoading(true);

            const formDataToSubmit: Partial<ChurchStaff> = {
                churchId: authData?.data.churchId || '',
                first_name: firstName,
                last_name: lastName,
                gender,
                dob,
                disability,
                phone_number: phoneNumber,
                email,
                residence,
                position,
                marital_status: maritalStatus,
                baptised,
                account_name: accountName,
                account_no: accountNo,
                career
            };

            console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));

            try {
                const response = await fetch('http://localhost:8000/church-staffs', {
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
						<div>
                                <Label htmlFor="first_name">First Name</Label>
                                <TextInput
                                    id="first_name"
                                    name="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
									value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
							<div>
                                <Label htmlFor="dob">Date of Birth</Label>
                                <TextInput
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="mt-1"
                                />
                            </div>
							<div className="col-span-2">
                                <Label htmlFor="disability">Disability</Label>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        id="disability"
                                        name="disability"
                                        checked={disability}
                                        onChange={(e) => setDisability(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="disability">Has Disability</Label>
                                </div>
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
							<div className="col-span-2 sm:col-span-1">
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
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
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
                                <Label>Baptised</Label>
                                <div className="flex gap-4 mt-2">
                                    {['Yes', 'No'].map((option) => (
                                        <div key={option} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`baptised-${option.toLowerCase()}`}
                                                name="baptised"
                                                checked={baptised === (option.toLowerCase() === 'yes')}
                                                onChange={() => setBaptised(option.toLowerCase() === 'yes')}
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
									value={accountName}
									onChange={(e) => setAccountName(e.target.value)}
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
									value={accountNo}
									onChange={(e) => setAccountNo(e.target.value)}
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
									value={career}
									onChange={(e) => setCareer(e.target.value)}
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