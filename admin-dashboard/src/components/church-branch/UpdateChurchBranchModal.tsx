import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FC, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useAppDispatch } from '../../app/hooks';
import { updateChurchBranch } from '../../features/church-branches/branchSlice';
import { ChurchBranch } from '../../types/ChurchBranches';


interface UpdateBranchProps {
	branch: ChurchBranch;
}

const UpdateChurchBranchModal: FC<UpdateBranchProps> = ({ branch }) => {
	const dispatch = useAppDispatch();
	const [isOpen, setOpen] = useState(false);
	const [name, setName] = useState(branch.name);
	const [email, setEmail] = useState(branch.email);
	const [contact, setContact] = useState(branch.church_number);
	const [dob, setDob] = useState(branch.dob);
	const [location, setLocation] = useState(branch.location);

	useEffect(() => {
		setName(branch.name);
		setEmail(branch.email);
		setContact(branch.church_number);
		setDob(branch.dob);
		setLocation(branch.location);
	}, [branch]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const updatedBranchData = {
			name,
			email,
			church_number: contact,
			date_opened: dob,
			location,
		};
		dispatch(updateChurchBranch({ branchId: branch.id!, branchData: updatedBranchData }));
		setOpen(false);
	};

	return (
		<>
			<Button color="success" onClick={() => setOpen(!isOpen)}>
				<FaEdit size={20} />
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<form onSubmit={handleSubmit}>
					<Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
						<strong>Update Church Branch</strong>
					</Modal.Header>
					<Modal.Body>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className='col-span-2'>
								<Label htmlFor="branchName">Church Branch Name</Label>
								<TextInput
									id="name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
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
					</Modal.Body>
					<Modal.Footer>
						<div className='flex flex-1 w-full justify-between'>
							<Button color="primary" type="submit" >
								Update
							</Button>
							<Button color="failure" onClick={() => setOpen(false)} type="button">
								Cancel
							</Button>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	)
}

export default UpdateChurchBranchModal