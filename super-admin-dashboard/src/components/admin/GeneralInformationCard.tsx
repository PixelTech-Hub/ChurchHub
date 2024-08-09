import React, { useState, useCallback } from 'react';
import { Card, Label, TextInput, Button } from 'flowbite-react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { Admin } from '../../types/Admins';
import { updateAdmin } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';

interface CardProps {
	admin: Admin;
}

type AdminField = keyof Admin;

const GeneralInformationCard: React.FC<CardProps> = ({ admin }) => {
	const dispatch = useAppDispatch();
	const [editMode, setEditMode] = useState<AdminField | null>(null);
	const [formData, setFormData] = useState<Admin>(admin);

	const handleEdit = useCallback((field: AdminField) => {
		setEditMode(field);
	}, []);

	const handleChange = useCallback((field: AdminField, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	}, []);

	const handleSave = useCallback((field: AdminField) => {
		if (admin.id) {
			dispatch(updateAdmin({
				adminId: admin.id,
				updateData: { [field]: formData[field] }
			}));
			toast.success(`${field} updated successfully`);
			setEditMode(null);
		} else {
			toast.error('Admin ID is undefined');
		}
	}, [admin.id, dispatch, formData]);

	const handleCancel = useCallback(() => {
		setFormData(admin);
		setEditMode(null);
	}, [admin]);

	const renderField = useCallback((label: string, field: AdminField, type: string = 'text') => (
		<div className="mb-4">
			<Label htmlFor={field}>{label}</Label>
			<div className="relative mt-1">
				<TextInput
					id={field}
					name={field}
					value={formData[field] as string}
					onChange={(e) => handleChange(field, e.target.value)}
					required
					type={type}
					className="pr-10"
					disabled={editMode !== field}
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-3">
					{editMode === field ? (
						<>
							<Button size="xs" color="green" onClick={() => handleSave(field)} className="mr-1">
								<FaSave />
							</Button>
							<Button size="xs" className="bg-red-500" onClick={handleCancel}>
								<FaTimes color='white' className='bg-red-500' />
							</Button>
						</>
					) : (
						<Button
							size="md"
							color="light"
							onClick={() => handleEdit(field)}
						>
							<FaEdit color='green' />
						</Button>
					)}
				</div>
			</div>
		</div>
	), [editMode, formData, handleCancel, handleChange, handleEdit, handleSave]);

	return (
		<Card>
			<h3 className="mb-4 text-xl font-bold dark:text-white">
				General Information
			</h3>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{renderField('Full Name', 'name')}
				{renderField('Email Address', 'email', 'email')}
				{renderField('Phone Number', 'phone_number', 'tel')}
				{renderField('Birthday', 'dob', 'date')}
				{renderField('Role', 'position')}
				{renderField('Department', 'department')}
				{renderField('Address', 'address')}
			</div>
		</Card>
	);
};

export default GeneralInformationCard;