import { CHURCH_API_URL } from "../../app/api";
import { Churches } from "../../types/Churches";

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
        console.error("Get Churches Error:", error);
        throw error;
    }
};

const getChurchById = async (churchId: string) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${CHURCH_API_URL}/${churchId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });

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

const createChurch = async (churchData: Churches) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(CHURCH_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(churchData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Create Church Error:", error);
        throw error;
    }
};

const updateChurch = async (churchId: string, churchData: Churches) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${CHURCH_API_URL}/${churchId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(churchData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Update Church Error:", error);
        throw error;
    }
};

const deleteChurch = async (churchId: string) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${CHURCH_API_URL}/${churchId}`, {
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

const churchService = {
    getAllChurches,
    getChurchById,
    createChurch,
    updateChurch,
    deleteChurch
};

export default churchService;