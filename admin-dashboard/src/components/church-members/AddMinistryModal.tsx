import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox } from 'flowbite-react';
import { ChurchMinistries } from '../../types/ChurchMinistries';

interface AddMinistryModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddMinistries: (selectedMinistries: ChurchMinistries[]) => void;
	currentMinistries: ChurchMinistries[];
}

const AddMinistryModal: React.FC<AddMinistryModalProps> = ({ isOpen, onClose, onAddMinistries, currentMinistries }) => {
	const [allMinistries, setAllMinistries] = useState<ChurchMinistries[]>([]);
	const [selectedMinistries, setSelectedMinistries] = useState<ChurchMinistries[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchChurchMinistries();
	}, []);

	const fetchChurchMinistries = async () => {
		try {
			const response = await fetch(`http://localhost:8000/church_ministries`);
			// console.log('response', response)
			if (response.ok) {
				const data = await response.json();
				setAllMinistries(data.data || []); // Assuming data.data contains the array of church staffs
				setLoading(false)
			} else {
				console.error("Failed to fetch church ministries", response);
				setError('Error')
				setLoading(false)
			}
		} catch (error) {
			console.error("Error fetching church ministries", error);
			setLoading(false)
		}
	};

	console.log('API Response:', allMinistries)



	const handleCheckboxChange = (ministry: ChurchMinistries) => {
		setSelectedMinistries(prev =>
			prev.some(m => m.id === ministry.id)
				? prev.filter(m => m.id !== ministry.id)
				: [...prev, ministry]
		);
	};

	const handleSubmit = () => {
		onAddMinistries(selectedMinistries);
		setSelectedMinistries([]);
		onClose();
	};

	return (
		<Modal show={isOpen} onClose={onClose}>
			<Modal.Header>Add Ministries</Modal.Header>
			<Modal.Body>
				{error ? (
					<div className="text-red-500">{error}</div>
				) : (
					<div className="space-y-4">
						{loading ? (
							<div>
								<p>Loading...</p>
							</div>
						) : Array.isArray(allMinistries) && allMinistries?.map(ministry => {

							return (
								<>
									<div key={ministry.id} className="flex items-center">
										<Checkbox
											id={ministry.id}
											checked={selectedMinistries.some(m => m.id === ministry.id) || currentMinistries.some(m => m.id === ministry.id)}
											onChange={() => handleCheckboxChange(ministry)}
											disabled={currentMinistries.some(m => m.id === ministry.id)}
										/>
										<label htmlFor={ministry.id} className="ml-2">
											{ministry.name}
										</label>
									</div>
								</>
							)
						}

						)}
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit}>Add Selected Ministries</Button>
				<Button color="gray" onClick={onClose}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddMinistryModal;