import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ChurchBranch } from '../../types/ChurchBranches';
import { AuthData } from '../../types/AuthData';
import { toast } from 'react-toastify';


const AddChurchBranchModal = () => {
	const [isOpen, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [dob, setDob] = useState("");
	const [location, setLocation] = useState("");

	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState<Partial<Record<keyof ChurchBranch, string>>>({});


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


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
			

			// console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));
			setLoading(true);
			console.log("processing...");
			const formDataToSubmit: Partial<ChurchBranch> = {
				mainChurchId: authData?.data.churchId || '',
				name,
				church_number: contact,
				dob,
				email,
				location
				
			};

			try {
				const response = await fetch('http://localhost:8000/church_branches', {
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
				setContact("")
				setDob("")
				setEmail("")
				setLocation("")
				setLoading(false);
				toast.success('Church branch added successfully');
			} catch (error) {
				console.error('Submission failed:', error);
				toast.error('Failed to add church branch');
				setLoading(false);
			} finally {
				setLoading(false);
			}
	};


	return (
		<>
			<Button color="primary" onClick={() => setOpen(!isOpen)}>
				<FaPlus className="mr-3 text-sm" />
				Add Church Branch
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
					<strong>Add New Church Branch</strong>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className='col-span-2'>
								<Label htmlFor="branchName">Church Branch Name</Label>
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
							<div className='col-span-2'>
								<Label htmlFor="email">Email Address</Label>
								<TextInput
									type='email'
									id="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="mt-1"
								/>
							</div>
							<div className='col-span-2'>
								<Label htmlFor="location">Location</Label>
								<TextInput
									id="location"
									name="location"
									type="text"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									className="mt-1"
								/>
							</div>
							<div className='col-span-2'>
								<Label htmlFor="contact">Contact</Label>
								<TextInput
								
									id="contact"
									name="contact"
									type="tel"
									value={contact}
									onChange={(e) => setContact(e.target.value)}
									className="mt-1"
								/>
							</div>
							<div className='col-span-2'>
								<Label htmlFor="dob">Date Opened</Label>
								<TextInput
								
									id="dob"
									name="dob"
									type="date"
									value={dob}
									onChange={(e) => setDob(e.target.value)}
									className="mt-1"
								/>
							</div>



						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<div className='flex flex-1 w-full justify-between'>
						<Button color="primary">
						{!loading ? 'Submit' : 'Processing...'}
						</Button>
						<Button color="failure" onClick={() => setOpen(false)} >
							Cancel
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AddChurchBranchModal