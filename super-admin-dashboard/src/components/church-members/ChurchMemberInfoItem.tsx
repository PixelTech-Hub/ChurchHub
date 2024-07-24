import { useState } from "react";
import { ChurchMembers } from "../../types/ChurchMember";



const ChurchMemberInfoItem: React.FC<{
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
  
	const getHelperText = (field: keyof ChurchMembers) => {
	  switch (field) {
		case 'gender':
		  return "Enter 'male', 'female', or 'rather not say'";
		case 'age':
		  return "Enter age range: '16-25', '26-35', '36-45', '46-55', or '56-above'";
		case 'marital_status':
		  return "Enter 'Married', 'Single', 'Widowed', or 'Divorced'";
		case 'education_level':
		  return "Enter 'not educated', 'Primary', 'Secondary', 'University', or 'Institution'";
		case 'email':
		  return "Enter a valid email address";
		case 'phone_number':
		  return "Enter a valid phone number (10-14 digits, can start with '+')";
		default:
		  return "Enter the new value";
	  }
	};
  
	return (
	  <div className="flex flex-col space-y-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
		<div className="flex items-center space-x-3">
		  <div className="text-blue-500 dark:text-blue-400 text-2xl">{icon}</div>
		  <div className="flex-grow">
			<p className="text-sm text-gray-500 dark:text-white">{label}</p>
			{isEditing ? (
			  <input
				type="text"
				value={editValue}
				onChange={(e) => setEditValue(e.target.value)}
				className="font-medium lg:text-lg text-[12px] dark:text-gray-300 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
			  />
			) : (
			  <p className="font-medium lg:text-lg text-[12px] dark:text-gray-300">{value}</p>
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
		{isEditing && (
		  <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
			{getHelperText(field)}
		  </p>
		)}
	  </div>
	);
  };

export default ChurchMemberInfoItem;