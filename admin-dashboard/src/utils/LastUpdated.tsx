import { HiClock } from "react-icons/hi";

const LastUpdated: React.FC<{ date: string | undefined }> = ({ date }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm flex items-center justify-center text-gray-600 dark:text-gray-400">
            <HiClock className="mr-2" /> Last updated: {new Date(date || '').toLocaleDateString()}
        </p>
    </div>
);


export default LastUpdated