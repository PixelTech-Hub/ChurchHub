import axios from 'axios';
import { Users } from '../../types/Users';
import { SINGLE_URL_API, USER_AUTH_LOGIN_API, USER_AUTH_SIGNUP_API, USER_DETAIL_API, USER_FORGOT_PASSWORD_API, USER_RESET_PASSWORD_API, USER_UPDATE_PASSWORD_API_URL, USERS_DETAIL_API, USERS_VERFIY_OTP } from '../../app/api';



const loginUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(USER_AUTH_LOGIN_API, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.status === 201) {
            return { ...response.data, email: userData.email };
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'An error occurred during login');
        }
        throw new Error('An unexpected error occurred');
    }
};

const verifyOtp = async (verifyOtpData: { email: string; otp: string }) => {
    try {
        const response = await axios.post(USERS_VERFIY_OTP, verifyOtpData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // console.log('verifyOtp response:', response);

        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'An error occurred during OTP verification');
        }
        throw new Error('An unexpected error occurred');
    }
};

const signupUser = async (userData: Users) => {
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

const getAllUsers = async (churchId: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${USERS_DETAIL_API}/${churchId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Get Church Branch By ID Error:", error);
        throw error;
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

const updateChurchStaffPassword = async (currentPassword: string, newPassword: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.patch(USER_UPDATE_PASSWORD_API_URL,
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

const updateChurchStaff = async (staffId: string, updateData: Partial<Users>) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.patch(`${SINGLE_URL_API}/${staffId}`, updateData, {
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

const getChurchStaffById = async (staffId: string): Promise<Users> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. User is not logged in.');
    }

    try {
        const response = await axios.get(`${SINGLE_URL_API}/${staffId}`, {
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


const requestPasswordReset = async (email: string) => {
    try {
        const response = await axios.post(USER_FORGOT_PASSWORD_API, { email }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'An error occurred while requesting password reset');
        }
        throw new Error('An unexpected error occurred');
    }
};

const resetPassword = async (token: string, newPassword: string, confirmPassword: string) => {
    try {
        const response = await axios.post(USER_RESET_PASSWORD_API, {
            token,
            newPassword,
            confirmPassword
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'An error occurred while resetting password');
        }
        throw new Error('An unexpected error occurred');
    }
};

const userService = {
    loginUser,
    verifyOtp,
    signupUser,
    getLoggedInUser,
    getAllUsers,
    updateChurchStaffPassword,
    getChurchStaffById,
    updateChurchStaff,
    requestPasswordReset,
    resetPassword
}
export default userService;