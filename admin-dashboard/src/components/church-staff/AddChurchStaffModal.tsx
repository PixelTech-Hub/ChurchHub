import React, { useState, } from 'react';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signup } from '../../features/auth/authSlice';
import { Users } from '../../types/Users';






const AddChurchStaffModal: React.FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    // Individual state for each form field
    const [fullName, setFullName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");


    const [errors, setErrors] = useState<Partial<Record<keyof Users, string>>>({});
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);
    const church = useAppSelector(state => state.church.userChurch)



    const validateField = (name: keyof Users, value: any) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
                break;
            case 'name':
                if (!value) error = 'Name is required';
                break;
            case 'title':
                if (!value) error = 'Title is required';
                break;
            case 'password':
                if (!value.trim()) error = 'Password is required';
                break;
            case 'role':
                if (!value.trim()) error = 'Role is required';
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
        const stepErrors: Partial<Record<keyof Users, string>> = {};
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

    const getValue = (field: keyof Users) => {
        switch (field) {
            case 'name': return fullName;
            case 'password': return password;
            case 'email': return email;
            case 'title': return title;
            case 'role': return role;
            default: return '';
        }
    };

    const getStepFields = (stepNumber: number): (keyof Users)[] => {
        switch (stepNumber) {
            case 1: return ['name', 'email', 'password'];
            case 2: return ['title', 'role'];
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

            const formDataToSubmit: Partial<Users> = {
                churchId: church.id,
                email,
                password,
                role,
                name: fullName,
                title,
                isEnabled: false,

            };

            // console.log('Data being sent to server:', JSON.stringify(formDataToSubmit, null, 2));

            try {
                await dispatch(signup(formDataToSubmit)).unwrap();
                // Reset form fields here
                setOpen(false);
                setFullName("")
                setEmail("")
                setPassword("")
                setTitle("")
                setRole("")
                toast.success('Church Staff added successfully');
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

    // console.log('ministreis::::', ministry)

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className='col-span-2 sm:col-span-'>
                                <Label htmlFor="first_name">Full Name</Label>
                                <TextInput
                                    id="first_name"
                                    name="first_name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    color={errors.name ? 'failure' : undefined}
                                    helperText={errors.name}
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
                            <div className="col-span-2">
                                <Label htmlFor="password">Password</Label>
                                <TextInput
                                    id="password"
                                    name="password"
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    color={errors.password ? 'failure' : undefined}
                                    helperText={errors.password}
                                    required
                                />
                            </div>



                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="title">Title</Label>
                                <TextInput
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    color={errors.title ? 'failure' : undefined}
                                    helperText={errors.title}
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Role</Label>
                                <div className="flex gap-4 mt-2">
                                    {['super admin', 'admin', 'editor', 'viewer'].map((status) => (
                                        <div key={status} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`role-${status}`}
                                                name="role"
                                                value={status}
                                                checked={role === status}
                                                onChange={() => setRole(status)}
                                                className="mr-2"
                                            />
                                            <Label htmlFor={`role-${status}`}>{status}</Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
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
                        {step < 2 ? (
                            <Button color="primary" onClick={handleNextStep}>
                                Next
                            </Button>
                        ) : (
                            <Button color="success" onClick={handleSubmit}>
                                {!isLoading ? 'Submit' : 'Processing...'}
                            </Button>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddChurchStaffModal;