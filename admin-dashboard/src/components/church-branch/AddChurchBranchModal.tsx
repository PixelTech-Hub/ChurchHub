import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ChurchBranch } from '../../types/ChurchBranches';
import { useAppDispatch, useAppSelector } from '../../app/hooks'; // Adjust the path as necessary
import { postNewChurchBranch } from '../../features/church-branches/branchSlice'; // Adjust the path as necessary
import { toast } from 'react-toastify';

const AddChurchBranchModal = () => {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [dob, setDob] = useState("");
    const [location, setLocation] = useState("");

    const dispatch = useAppDispatch();
    const { posting } = useAppSelector((state) => state.branch); 
	const church = useAppSelector(state => state.church.userChurch)

    const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	
		if (!church?.id) {
			toast.error('Main Church ID is not available.');
			return;
		}
	
		// Create a ChurchBranch object with required fields
		const formDataToSubmit: ChurchBranch = {
			mainChurchId: church.id,
			name,
			church_number: contact,
			dob,
			email,
			location,
		};
	
		try {
			await dispatch(postNewChurchBranch(formDataToSubmit)).unwrap();
			setOpen(false);
			setName("");
			setContact("");
			setDob("");
			setEmail("");
			setLocation("");
			toast.success('Church branch added successfully');
		} catch (error) {
			toast.error('Failed to add church branch');
		}
	};
	

    return (
        <>
            <Button color="primary" onClick={() => setOpen(!isOpen)}>
                <FaPlus className="mr-3 text-sm" />
                Add Church Branch
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Add New Church Branch</strong>
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
                            <Button color="primary" type="submit" disabled={posting}>
                                {posting ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Button color="failure" onClick={() => setOpen(false)} type="button">
                                Cancel
                            </Button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AddChurchBranchModal;
