import { Avatar, Card } from "flowbite-react";
import { FC } from "react";
import { HiCloudUpload } from "react-icons/hi";


interface UserProfileProp {
	admin: any;
}

const UserProfileCard: FC<UserProfileProp> = function ({ admin }) {
	// console.log(admin)
	return (
		<Card>
			<div className="flex flex-row items-center">
				<Avatar className="w-32 " >

				</Avatar>
				<div>
					<h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
						{admin.name}
					</h3>
					<div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						Software Engineer
					</div>
					<a
						href="#"
						className="inline-flex items-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						<HiCloudUpload className="mr-2" />
						Change picture
					</a>
				</div>
			</div>
		</Card>
	);
};


export default UserProfileCard;