import { API_BASE_URL } from "@/app/api";
import { User } from "@/types/User";
import axios from 'axios';


const registerNewUser = async (userData: User) => {
    try {
        // const response = await fetch(`${API_BASE_URL}/users/auth/signup`, {
        const response = await axios.post(`${API_BASE_URL}/users/auth/signup`, userData)
        return response.data;

    } catch (error) {
        console.error("Create User Error:", error);
        throw error;
    }
};

const loginUser = async (userData: User) => {
    const response = await axios.post(`${API_BASE_URL}/users/auth/signup`, userData)
    if (response.data) {
        const user = localStorage.getItem("users")
        if (user !== null) {
            localStorage.removeItem("user");
        }
        localStorage.setItem("users", JSON.stringify(response.data))
    }
    console.log(response.data)
    return response.data
}

const logout = () => {
    localStorage.removeItem("users");
}



const userService = {
    registerNewUser,
    loginUser,
    logout
}
export default userService;