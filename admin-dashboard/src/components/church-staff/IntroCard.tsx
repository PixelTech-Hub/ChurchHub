import { Card } from "flowbite-react";
import { FC } from "react";
import Image01 from '../../assets/images/dan.png'

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
	console.log('email address', email)
	return (
		<Card>
			<div className="font-bold dark:text-white">
			<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			General Information
                    </h1>
			</div>
			<div className="flex text-2xl  dark:text-white">
				<div>
					<img
						alt={firstName}
						src={Image01}
						className="mr-4 h-32 w-24 rounded-lg object-cover" />
				</div>
				<div>
					<span>{firstName} {lastName}</span>
					<p className="text-2xl font-medium text-gray-600 dark:text-gray-400">
						{position}
					</p>
					<p className="text-lg font-medium text-gray-600 dark:text-gray-400">
						{career}
					</p>
				</div>
			</div>

			<div className="mt-4 space-y-2">
				<p className="text-base font-normal text-gray-500 dark:text-gray-400">
					Email: <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
				</p>
				<p className="text-base font-normal text-gray-500 dark:text-gray-400">
					Phone: <span className="font-semibold text-gray-900 dark:text-white">+{phoneNumber}</span>
				</p>
				<p className="text-base font-normal text-gray-500 dark:text-gray-400">
					Residence: <span className="font-semibold text-gray-900 dark:text-white">{residence}</span>
				</p>
			</div>
		</Card >
	);
};

export default IntroCard;
