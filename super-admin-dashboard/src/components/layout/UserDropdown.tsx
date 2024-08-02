import { Avatar, Dropdown } from "flowbite-react";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const UserDropdown: FC = function () {

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	const currentAdmin = useAppSelector((state) => state.auth.currentAdmin);

	const handleLogout = () => {
		dispatch(logout());
		toast.success("Logged out")
		navigate('/authentication/sign-in'); // Redirect to login page after logout
	};


	return (
		<Dropdown
			arrowIcon={false}
			inline
			label={
				<span>
					<span className="sr-only">User menu</span>
					<Avatar
						alt="User settings"
						img={FaUserCircle}
						rounded
						size="sm"
						placeholderInitials="NS"

					/>
				</span>
			}
		>
			<Dropdown.Header>
				<span className="block text-sm">{currentAdmin?.name}</span>
				<span className="block truncate text-sm font-medium">
					{currentAdmin?.email}
				</span>
			</Dropdown.Header>
			<Dropdown.Item href="/users/settings">Settings</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
		</Dropdown>
	);
};

export default UserDropdown