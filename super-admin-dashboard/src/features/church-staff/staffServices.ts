import axios from 'axios';
import { Users } from '../../types/Users';
import { USER_AUTH_SIGNUP_API, USERS_DETAIL_API } from '../../app/api';



const createNewChurchStaff = async (userData: Users) => {
    try {
        const response = await axios.post(USER_AUTH_SIGNUP_API, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error details:', error.response?.data);
            console.error('Status code:', error.response?.status);
            console.error('Headers:', error.response?.headers);
            throw new Error(error.response?.data?.message || 'An error occurred during signup');
        }
        throw new Error('An unexpected error occurred');
    }
};

const getAllChurchStaffs = async () => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${USERS_DETAIL_API}`, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Get Church Staff Error:", error);
		throw error;
	}
};

const deleteChurchStaff = async (staffId: string) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${USERS_DETAIL_API}/${staffId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Successful deletion
    } catch (error) {
        console.error("Delete Church Error:", error);
        throw error;
    }
};

const ChurchStaffService = {
	createNewChurchStaff,
    getAllChurchStaffs,
    deleteChurchStaff
}
export default ChurchStaffService;