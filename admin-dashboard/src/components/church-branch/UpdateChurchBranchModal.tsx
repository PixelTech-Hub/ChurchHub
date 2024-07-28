import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const UpdateChurchBranchModal = () => {
	const [isOpen, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [dob, setDob] = useState("");
	const [location, setLocation] = useState("");
	return (
		<>
			<Button color="success" onClick={() => setOpen(!isOpen)}>
				<FaEdit size={20} />
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<form >
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