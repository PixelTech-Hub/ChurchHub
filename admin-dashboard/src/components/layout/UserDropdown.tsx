import { Avatar, Dropdown } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { Users } from "../../types/Users";
import { AuthData } from "../../types/AuthData";
import axios from "axios";
import { API_BASE_URL } from "../../app/api";

const UserDropdown: FC = function () {

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState<Users>({} as Users);
	const [loading, setLoading] = useState(false);
	const [authData, setAuthData] = useState<AuthData | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem('userData');
		// console.log('********strapped data', storedData)
		if (storedData) {
			try {
				const parsedData: AuthData = JSON.parse(storedData);
				setAuthData(parsedData);

				// Fetch church data immediately after setting authData
				if (parsedData.id) {
					fetchUserData(parsedData.id, parsedData.accessToken);
				}
			} catch (error) {
				console.error('Error parsing auth data:', error);
			}
		}
	}, []);

	const fetchUserData = (id: string, accessToken: string) => {
		setLoading(true);
		axios
			.get(`${API_BASE_URL}/users/${id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
			.then((response) => {
				setUser(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching church data:', error);
				setLoading(false);
			});
	};

	if (loading) {
		return <div>Loading...</div>;
	}


	const handleLogout = () => {
		dispatch(logout());
		toast.success("Logged out")
		navigate('/authentication/sign-in'); // Redirect to login page after logout
	};

	// console.log('user data', user)

	if(!authData){
		return null; // Return null if authData is not available yet (i.e., user is not logged in)
	}


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
				<span className="block text-sm">{user.name}</span>
				<span className="block truncate text-sm font-medium">
					{user.email}
				</span>
			</Dropdown.Header>
			<Dropdown.Item href="users/settings">Settings</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
		</Dropdown>
	);
};

export default UserDropdown