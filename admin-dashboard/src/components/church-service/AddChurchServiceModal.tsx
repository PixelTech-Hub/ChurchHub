import { FC, useEffect, useState } from "react"
import { ChurchServices } from "../../types/ChurchServices";
import { AuthData } from "../../types/AuthData";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";


const AddChurchServiceModal: FC = ({ }) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);

	// Individual state for each form field
	const [name, setName] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [language, setLanguage] = useState("");


	const [errors, setErrors] = useState<Partial<Record<keyof ChurchServices, string>>>({});
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

	const validateField = (name: keyof ChurchServices, value: any) => {
		let error = '';
		switch (name) {
			case 'name':
				if (!value) error = 'Service name is required';
				break;
			case 'start_time':
				if (!value) error = 'Start Time is required';
				break;
			case 'end_time':
				if (!value) error = 'End Time is required';
				break;
			case 'language':
				if (!value) error = 'Language is required';
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
		const stepErrors: Partial<Record<keyof ChurchServices, string>> = {};
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

	const getValue = (field: keyof ChurchServices) => {
		switch (field) {
			case 'name': return name;
			case 'start_time': return start;
			case 'end_time': return end;
			case 'language': return language;
			default: return '';
		}
	};



	const getStepFields = (stepNumber: number): (keyof ChurchServices)[] => {
		switch (stepNumber) {
			case 1: return ['name', 'start_time', 'end_time', 'language'];
			default: return [];
		}
	};



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateStep()) {
			setLoading(true);
			console.log("processing...");
			const formDataToSubmit: Partial<ChurchServices> = {
				churchId: authData?.data.churchId || '',
				name,
				start_time: start,
				end_time: end,
				language
			};

			// console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));

			try {
				const response = await fetch('http://localhost:8000/church_services', {
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
				// Reset form fields here
				setOpen(false);
				setName("")
				setStart("")
				setEnd("")
				setLanguage("")
				toast.success('Church service added successfully');
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
								<Label htmlFor="name">Name</Label>
								<TextInput
									id="name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									color={errors.name ? 'failure' : undefined}
									helperText={errors.name}
									required
								/>
							</div>
							{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
							<div>
								<Label htmlFor="start_at">Start At</Label>
								<TextInput
									id="start_at"
									name="start_at"
									type="time"
									value={start}
									onChange={(e) => setStart(e.target.value)}
									className="mt-1"
								/>
							</div>
							{errors.start_time && <p className="mt-1 text-sm text-red-500">{errors.start_time}</p>}
							<div>
								<Label htmlFor="end_at">End At</Label>
								<TextInput
									id="end_at"
									name="end_at"
									type="time"
									value={end}
									onChange={(e) => setEnd(e.target.value)}
									className="mt-1"
								/>
							</div>
							{errors.end_time && <p className="mt-1 text-sm text-red-500">{errors.end_time}</p>}
							<div className='col-span-2'>
								<Label htmlFor="language">Language</Label>
								<TextInput
									id="language"
									name="language"
									value={language}
									onChange={(e) => setLanguage(e.target.value)}
									color={errors.language ? 'failure' : undefined}
									helperText={errors.language}
									required
								/>
							</div>
							{errors.language && <p className="mt-1 text-sm text-red-500">{errors.language}</p>}
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
				Add Church Service
			</Button>
			<Modal show={isOpen} onClose={() => setOpen(false)} size="xl">
				<Modal.Header>Add Church Service</Modal.Header>
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
						{step < 1 ? (
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

export default AddChurchServiceModal