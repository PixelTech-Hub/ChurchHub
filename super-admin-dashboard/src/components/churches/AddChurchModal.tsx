import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { Churches } from "../../types/Churches";
import { createChurch } from "../../features/churches/churchSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const AddChurchModal = () => {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [website, setWebsite] = useState("");
    const [vision, setVision] = useState("");
    const [mission, setMission] = useState("");
    const [values, setValues] = useState("");


    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.church)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("processing...");
        const formDataToSubmit: Partial<Churches> = {
            name,
            core_values: values,
            email,
            isEnabled: true,
            mission,
            office_no: contact,
            vision,
            website,
        };
        try {
            await dispatch(createChurch(formDataToSubmit)).unwrap();
            // Reset form fields here
            setOpen(false);
            setName("");
            setContact("");
            setEmail("");
            setWebsite("");
            setVision("");
            setMission("");
            setValues("");
            toast.success('Church created successfully');
            toast.success('Church Staff added successfully');
        } catch (error) {
            console.error('Submission failed:', error);
            toast.error('Failed to add church staff');
        } finally {
            // setLoading(false);
        }


    };

    return (
        <>
            <Button color="primary" onClick={() => setOpen(!isOpen)}>
                <FaPlus className="mr-3 text-sm" />
                Create Church
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Create A New Church</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className='col-span-2'>
                                <Label htmlFor="branchName">Church Name</Label>
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
                                <Label htmlFor="website">Website URL</Label>
                                <TextInput
                                    id="website"
                                    name="website"
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
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
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='flex flex-1 w-full justify-between'>
                            <Button color="primary" type="submit" >
                                {!loading ? 'Submitting...' : 'Submit'}
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

export default AddChurchModal