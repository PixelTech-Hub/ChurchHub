import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { Churches } from "../../types/Churches";
import { CHURCH_API_URL } from "../../app/api";

const AddChurchModal = () => {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [website, setWebsite] = useState("");
    const [vision, setVision] = useState("");
    const [mission, setMission] = useState("");
    const [values, setValues] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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
            const response = await fetch(CHURCH_API_URL, {
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
            setName("");
            setContact("");
            setEmail("");
            setWebsite("");
            setVision("");
            setMission("");
            setValues("");
            setLoading(false);
            toast.success('Church created successfully');
        } catch (error) {
            console.error('Submission failed:', error);
            toast.error('Failed to create a new church');
        } finally {
            setLoading(false);
            setOpen(false);
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
                            <Button color="primary" type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
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