import { CHURCH_API_URL } from "../../app/api";





const getAllChurches = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(CHURCH_API_URL, {
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
        console.error("Get Church Error:", error);
        throw error;
    }
};

const getChurchById = async (churchId: string) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        if (!accessToken) {
            throw new Error('No access token found');
        }

        // console.log('Access Token:', accessToken); // Log the token

        const response = await fetch(`${CHURCH_API_URL}/${churchId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

        // console.log('Response status:', response.status);
        // console.log('Response headers:', response.headers);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response body:', errorBody);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Get Single Church Error:", error);
        throw error;
    }
};
const churchService = {
    getAllChurches,
    getChurchById
};

export default churchService;