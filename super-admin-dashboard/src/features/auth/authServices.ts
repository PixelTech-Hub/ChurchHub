import axios from 'axios';
import { ADMIN_API_URL, ADMIN_LOGGED_API_URL, ADMIN_LOGIN_API_URL, ADMIN_SIGNUP_API_URL, ADMIN_UPDATE_PASSWORD_API_URL } from '../../app/api';
import { Admin } from '../../types/Admins';


const loginAdmin = async (adminData: Admin) => {
	// console.log('Sending login request with data:', adminData);
	try {
		const response = await axios.post(ADMIN_LOGIN_API_URL, adminData, {
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

const signupAdmin = async (adminData: Admin) => {
    try {
        const response = await axios.post(ADMIN_SIGNUP_API_URL, adminData, {
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
}

const getAllAdmins = async () => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(ADMIN_API_URL, {
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
		console.error("Get all Admins Error:", error);
		throw error;
	}
};

const getLoggedInAdmin = async (): Promise<Admin> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.get(ADMIN_LOGGED_API_URL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     console.error('Error details:', error.response?.data);
        //     console.error('Status code:', error.response?.status);
        //     console.error('Headers:', error.response?.headers);
        //     throw new Error(error.response?.data?.message || 'An error occurred while fetching user data');
        // }
        throw new Error('An unexpected error occurred');
    }
};

const updateAdmin = async (adminId: string, updateData: Partial<Admin>) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.patch(`${ADMIN_API_URL}/${adminId}`, updateData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update admin details');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error details:', error.response?.data);
            console.error('Status code:', error.response?.status);
            console.error('Headers:', error.response?.headers);
            throw new Error(error.response?.data?.message || 'An error occurred while updating admin details');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Add this new function
const updateAdminPassword = async (currentPassword: string, newPassword: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.patch(ADMIN_UPDATE_PASSWORD_API_URL, 
            { currentPassword, newPassword },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update password');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error details:', error.response?.data);
            throw new Error(error.response?.data?.message || 'An error occurred while updating password');
        }
        throw new Error('An unexpected error occurred');
    }
};

const getAdminById = async (adminId: string): Promise<Admin> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.get(`${ADMIN_API_URL}/${adminId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch admin details');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error details:', error.response?.data);
            throw new Error(error.response?.data?.message || 'An error occurred while fetching admin details');
        }
        throw new Error('An unexpected error occurred');
    }
};





const userService = {
	loginAdmin,
	signupAdmin,
	getAllAdmins,
	getLoggedInAdmin,
	updateAdmin,
	updateAdminPassword,
    getAdminById
}
export default userService;