import axios from 'axios';
import { Users } from '../../types/Users';
import { API_BASE_URL } from '../../app/api';


const loginUser = async (userData: Users) => {
	const response = await axios.post(`${API_BASE_URL}/users/auth/login`, userData)
	if (response.data && response.data.accessToken) {
		localStorage.setItem("token", response.data.accessToken)
	}
	return response.data
}

const userService = {
	loginUser
}
export default userService;