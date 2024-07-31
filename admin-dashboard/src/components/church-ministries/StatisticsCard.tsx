import { Card } from "flowbite-react";
import { ChurchMinistries } from "../../types/ChurchMinistries";
import { HiUsers } from "react-icons/hi";

const StatisticsCard: React.FC<{ ministry: ChurchMinistries }> = () => (
    <Card>
        <div className="flex items-center space-x-3 mb-4">
            <HiUsers className="text-3xl text-indigo-500" />
            <h3 className="text-lg font-semibold">Ministry Statistics</h3>
        </div>
        <div className="space-y-2">
            <p className="text-sm text-gray-600">Members: <span className="font-semibold text-indigo-600">120</span></p>
            <p className="text-sm text-gray-600">Events this month: <span className="font-semibold text-indigo-600">5</span></p>
            <p className="text-sm text-gray-600">Volunteers: <span className="font-semibold text-indigo-600">25</span></p>
        </div>
    </Card>
);


export default StatisticsCard