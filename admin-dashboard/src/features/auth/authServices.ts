import axios from 'axios';
import { Users } from '../../types/Users';
import { USER_AUTH_LOGIN_API, USER_DETAIL_API } from '../../app/api';


const loginUser = async (userData: Users) => {
	// console.log('Sending login request with data:', userData);
	try {
		const response = await axios.post(USER_AUTH_LOGIN_API, userData, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		});

		if (response.status === 201) {
			// console.log('Received response:', response.data);
			localStorage.setItem('accessToken', response.data.accessToken);
			return response.data;
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error details:', error.response?.data);
			console.error('Status code:', error.response?.status);
			console.error('Headers:', error.response?.headers);
			throw new Error(error.response?.data?.message || 'An error occurred during login');
		}
		throw new Error('An unexpected error occurred');
	}
};

const getLoggedInUser = async (): Promise<Users> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.get(USER_DETAIL_API, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error details:', error.response?.data);
            console.error('Status code:', error.response?.status);
            console.error('Headers:', error.response?.headers);
            throw new Error(error.response?.data?.message || 'An error occurred while fetching user data');
        }
        throw new Error('An unexpected error occurred');
    }
};

const userService = {
	loginUser,
	getLoggedInUser
}
export default userService;