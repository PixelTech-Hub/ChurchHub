import { ChurchMinistries } from "../../types/ChurchMinistries";

const MinistryHeader: React.FC<{ ministry: ChurchMinistries }> = ({ ministry }) => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{ministry.name}</h1>
        <p className="text-xl opacity-80">{ministry.description}</p>
    </div>
);

export default MinistryHeader