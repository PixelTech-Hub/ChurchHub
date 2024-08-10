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

    // Get user data from the Redux store
    const userData = useAppSelector((state) => state.auth.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out")
        navigate('/authentication/sign-in'); // Redirect to login page after logout
    };

    // Get user's initials for the avatar
    const userInitials = userData ?
        `${userData.name?.[0] || ''}`.toUpperCase() :
        'U';



    // console.log('userInitials', userData)

    return (
        <Dropdown
            arrowIcon={false}
            inline
            label={
                <span>
                    <span className="sr-only">User menu</span>
                    <Avatar
                        alt={userInitials}
                        img={FaUserCircle}
                        rounded
                        size="sm"
                        placeholderInitials={userInitials}
                    />
                </span>
            }
        >
            <Dropdown.Header>
                <span className="block text-sm">
                    {userData ? `${userData?.name} ` : 'User'}
                </span>
                <span className="block truncate text-sm font-medium">
                    {userData ? userData?.email : 'user@example.com'}
                </span>
            </Dropdown.Header>
            <Dropdown.Item href="users/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
    );
};

export default UserDropdown;