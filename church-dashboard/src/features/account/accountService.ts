import { API_BASE_URL } from "@/app/api";

const getAccount = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Post Contact Error:", error);
        throw error;
    }
};



const AccountSlicde = {
    getAccount
}
export default AccountSlicde