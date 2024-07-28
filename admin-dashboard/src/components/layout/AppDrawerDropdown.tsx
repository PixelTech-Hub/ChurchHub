import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { FC } from "react";
import { Dropdown } from "flowbite-react";
import { HiArchive, HiCog, HiCurrencyDollar, HiInbox, HiLogout, HiOutlineTicket, HiShoppingBag, HiUserCircle, HiUsers, HiViewGrid } from "react-icons/hi";
import { toast } from "react-toastify";

const AppDrawerDropdown: FC = function () {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		dispatch(logout());
		toast.success("Logged out")
		navigate('/authentication/sign-in'); // Redirect to login page after logout
	};
	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={
				<span className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
					<span className="sr-only">Apps</span>
					<HiViewGrid className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
				</span>
			}
		>
			<div className="block rounded-t-lg border-b bg-gray-50 py-2 px-4 text-center text-base font-medium text-gray-700 dark:border-b-gray-600 dark:bg-gray-700 dark:text-white">
				Apps
			</div>
			<div className="grid grid-cols-3 gap-4 p-4">
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiShoppingBag className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Sales
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiUsers className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Users
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiInbox className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Inbox
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiUserCircle className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Profile
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiCog className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Settings
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiArchive className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Products
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiCurrencyDollar className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Pricing
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
				>
					<HiOutlineTicket className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Billing
					</div>
				</a>
				<a
					href="#"
					className="block rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
					onClick={handleLogout}
				>
					<HiLogout className="mx-auto mb-1 h-7 w-7 text-gray-500 dark:text-white" />
					<div className="text-sm font-medium text-gray-900 dark:text-white">
						Logout
					</div>
				</a>
			</div>
		</Dropdown>
	);
};

export default AppDrawerDropdown;