import { useState } from "react";
import { ChurchMinistries } from "../../types/ChurchMinistries";
import { Card } from "flowbite-react";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    field: keyof ChurchMinistries;
    onUpdate: (field: keyof ChurchMinistries, value: string) => Promise<void>;
    inputType: 'text' | 'textarea';
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, field, onUpdate, inputType }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(value);

    const handleUpdate = async () => {
        await onUpdate(field, editValue);
        setIsEditing(false);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {icon}
                    <h3 className="text-lg font-semibold">{label}</h3>
                </div>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-600">
                        <MdEdit size={20} />
                    </button>
                )}
            </div>
            {isEditing ? (
                <div className="space-y-2">
                    {inputType === 'textarea' ? (
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    ) : (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                    <div className="flex justify-end space-x-2">
                        <button onClick={handleUpdate} className="text-green-500 hover:text-green-600">
                            <MdSave size={20} />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600">
                            <MdCancel size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 dark:text-gray-300">{value}</p>
            )}
        </Card>
    );
};

export default InfoCard;