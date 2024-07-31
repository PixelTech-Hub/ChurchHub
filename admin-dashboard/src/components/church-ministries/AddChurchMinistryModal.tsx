import {  useState } from "react";
import { ChurchMinistries } from "../../types/ChurchMinistries";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postNewChurchMinistry } from "../../features/church-ministries/ministrySlice";


const AddChurchMinistryModal = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);

	// Individual state for each form field
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const [errors, setErrors] = useState<Partial<Record<keyof ChurchMinistries, string>>>({});
	const dispatch = useAppDispatch();
	const { posting } = useAppSelector((state) => state.ministry);
	const church = useAppSelector(state => state.church.userChurch)



	const validateField = (name: keyof ChurchMinistries, value: any) => {
		let error = '';
		switch (name) {
			case 'name':
				if (!value) error = 'Ministry name is required';
				break;
				if (!value) error = 'Ministry Leader name is required';
				break;
			case 'description':
				if (!value) error = 'Description is required';
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
		const stepErrors: Partial<Record<keyof ChurchMinistries, string>> = {};
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

	const getValue = (field: keyof ChurchMinistries) => {
		switch (field) {
			case 'name': return name;
			case 'description': return description;
			default: return '';
		}
	};



	const getStepFields = (stepNumber: number): (keyof ChurchMinistries)[] => {
		switch (stepNumber) {
			case 1: return ['name'];
			case 2: return ['description'];
			default: return [];
		}
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!church?.id) {
			toast.error('Main Church ID is not available.');
			return;
		}
		if (validateStep()) {
			// console.log("processing...");
			
			const formDataToSubmit: ChurchMinistries = {
				churchId: church?.id,
				name,
				description
			};
		

			// console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));

			try {
				await dispatch(postNewChurchMinistry(formDataToSubmit)).unwrap();
				// Reset form fields here
				setOpen(false);
				setName("")
				setDescription("")
				toast.success('Church service added successfully');
			} catch (error) {
				console.error('Submission failed:', error);
				toast.error('Failed to add church staff');
			} finally {
				// setLoading(false);
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
						<div className="grid grid-cols-2 gap-4">
							<div className='col-span-2'>
								<Label htmlFor="name">Name:</Label>
								<TextInput
									id="name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									color={errors.name ? 'failure' : undefined}
									helperText={errors.name}
									required
								/>
								{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
							</div>
						</div>
					</>
				);
			case 2:
				return (
					<div className='flex flex-col '>
						<Label htmlFor="description">Description:</Label>
						<textarea
							name="description"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							color={errors.description ? 'failure' : undefined}
							required
							className="rounded-md dark:bg-gray-600 outline-none dark:outline-white h-[15rem] dark:text-white mt-4"
						>

						</textarea>
						{errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
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
				Add Church Ministry
			</Button>
			<Modal show={isOpen} onClose={() => setOpen(false)} size="xl">
				<Modal.Header>Add Church Ministry</Modal.Header>
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
								{!posting ? 'Submit' : 'Processing...'}
							</Button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AddChurchMinistryModal