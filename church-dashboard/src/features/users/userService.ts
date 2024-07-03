import { User } from "@/types/User";
import axios from "axios";

const API_URL = 'http://localhost:8000'

// Login Admin / Partner
const login = async (userData: User) => {
    const response = await axios.post(`${API_URL}/users/auth/login`, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}




const userService = {
    login,
}
export default userService