import { FC, useState } from "react";
import { ChurchMembers } from '../../types/ChurchMember'

const InfoItem: FC<{
	icon: React.ReactNode;
	label: string;
	value: string;
	field: keyof ChurchMembers;
	onUpdate: (field: keyof ChurchMembers, value: string) => Promise<void>;
}> = ({ icon, label, value, field, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const handleUpdate = async () => {
		await onUpdate(field, editValue);
		setIsEditing(false);
	};

	return (
		<div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
			<div className="text-blue-500 dark:text-blue-400 text-2xl">{icon}</div>
			<div className="flex-grow">
				<p className="text-sm text-gray-500 dark:text-white">{label}</p>
				{isEditing ? (
					<input
						type="text"
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						className="font-medium text-lg dark:text-gray-300 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
					/>
				) : (
					<p className="font-medium text-lg dark:text-gray-300">{value}</p>
				)}
			</div>
			<div>
				{isEditing ? (
					<>
						<button onClick={handleUpdate} className="text-green-500 mr-2">Save</button>
						<button onClick={() => setIsEditing(false)} className="text-red-500">Cancel</button>
					</>
				) : (
					<button onClick={() => setIsEditing(true)} className="text-blue-500">Edit</button>
				)}
			</div>
		</div>
	);
};