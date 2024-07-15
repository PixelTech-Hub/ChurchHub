import { FC } from "react";
import { HiMail, HiPhone, HiLocationMarker, HiBriefcase } from "react-icons/hi";
import Image01 from '../../assets/images/dan.png'
import InfoItem from "./InfoItem";

interface IntroCardProps {
	firstName: string;
	lastName: string;
	position: string;
	email: string;
	phoneNumber: string;
	residence: string;
	career: string;
}




const IntroCard: FC<IntroCardProps> = ({ firstName, lastName, position, email, phoneNumber, residence, career }) => {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg overflow-hidden">
			<div className="p-8">
				<div className="flex flex-col md:flex-row items-center md:items-start">
					<img
						alt={firstName}
						src={Image01}
						className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-md mb-6 md:mb-0 md:mr-8"
					/>
					<div className="text-center md:text-left">
						<h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">{firstName} {lastName}</h2>
						<p className="text-xl text-indigo-600 dark:text-indigo-300 font-semibold mt-1">{position}</p>
						<p className="text-gray-600 dark:text-gray-300 mt-1 italic">{career}</p>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					<InfoItem
						icon={<HiMail className="w-6 h-6 text-indigo-500" />}
						label="Email"
						value={firstName + " " + lastName}
						href={`mailto:${email}`}
						tooltip="Compose an email"
						recipientEmail={email} 
						isEmail={true}
					/>
					<InfoItem
						icon={<HiPhone className="w-6 h-6 text-green-500" />}
						label="Phone"
						value={`+${phoneNumber}`}
						href={`tel:+${phoneNumber}`}
						tooltip="Make a call"
					/>
					<InfoItem
						icon={<HiLocationMarker className="w-6 h-6 text-red-500" />}
						label="Residence"
						value={residence}
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(residence)}`}
						tooltip="View on map"
					/>
					<InfoItem
						icon={<HiBriefcase className="w-6 h-6 text-purple-500" />}
						label="Career"
						value={career}
					/>
				</div>
			</div>
		</div>
	);
};





export default IntroCard;