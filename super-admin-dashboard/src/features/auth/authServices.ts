import axios from 'axios';
import { Users } from '../../types/Users';
import { API_BASE_URL } from '../../app/api';


const loginUser = async (userData: Users) => {
	console.log('Sending login request with data:', userData);
	try {
		const response = await axios.post(`${API_BASE_URL}/admin/auth/login`, userData, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		});

		if (response.status === 201) {
			console.log('Received response:', response.data);
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

const userService = {
	loginUser
}
export default userService;