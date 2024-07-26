import { FC, useState } from 'react';
import { Button } from 'flowbite-react';
import { MdEdit } from 'react-icons/md';
import { Churches } from '../../types/Churches';

interface UpdateChurchProp {
  fieldName: keyof Churches;  // Change this to keyof Churches
  value: string | number | undefined;  // Add undefined as a possible type
  onUpdate: (fieldName: keyof Churches, newValue: string | number) => Promise<void>;
}

const UpdateChurch: FC<UpdateChurchProp> = ({ fieldName, value, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value ?? '');

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(value ?? '');  // Set to empty string if value is undefined
  };

  const handleSave = async () => {
    await onUpdate(fieldName, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value ?? '');  // Reset to original value or empty string
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="mt-2 flex items-center">
          <Button onClick={handleSave} className="mr-2">Save</Button>
          <Button color="light" onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between'>
      {value ?? `No ${fieldName} available.`} 
      <Button
        size="xs"
        color="light"
        onClick={handleEdit}
        className="ml-2"
      >
        <MdEdit className="mr-2 h-4 w-4" />
        Edit
      </Button>
    </div>
  );
};

export default UpdateChurch;