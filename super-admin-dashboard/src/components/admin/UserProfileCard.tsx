import { Card } from "flowbite-react";
import { FC } from "react";
import { HiCloudUpload } from "react-icons/hi";


interface UserProfileProp {
	admin: any;
}

const UserProfileCard: FC<UserProfileProp> = function ({admin}) {
	// console.log(admin)
	return (
	  <Card>
		<div className="items-center sm:flex sm:space-x-4 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4">
		  <img
			alt="user image"
			src="../../images/users/jese-leos-2x.png"
			className="mb-4 h-28 w-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0"
		  />
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