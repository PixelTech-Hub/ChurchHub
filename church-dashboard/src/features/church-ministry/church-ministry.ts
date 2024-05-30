import { API_BASE_URL } from "@/app/api";
import { ChurchMinistry } from "@/types/ChurchMinistry";



const createNewChurchMinistry = async (data: ChurchMinistry) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_ministries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Failed to create new church ministry: ${response.status} ${response.statusText}`);
        }

        // Parse response JSON data
        const responseData = await response.json();
        console.log('Church Service created successfully:', responseData);

        return responseData; // Return the created sermon data
    } catch (error) {
        console.error("Create Service Error:", error);
        throw error;
    }
};


const getChurchMinistries = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_ministries`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Church Ministries Error:", error);
        throw error;
    }
};


const deleteChurchMinistry = async (churchMinistryId: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_ministries/${churchMinistryId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete church ministry');
        }

        // console.log("Delete Sermon Response:", response);
        return churchMinistryId; // Return the deleted sermonId
    } catch (error) {
        console.error("Delete Church Ministry Error:", error);
        throw error;
    }
};

const updateChurchMinistryById = async (ministryId: string, updatedData: Partial<ChurchMinistry>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_ministries/${ministryId}`, {
            method: 'PATCH', // Assuming you use PUT method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Failed to update church ministry');
        }

        return response.json(); // Return the updated sermon data
    } catch (error) {
        console.error("Update Church Ministry Error:", error);
        throw error;
    }
};

const ChurchMinistryService = {
    createNewChurchMinistry,
    getChurchMinistries,
    deleteChurchMinistry,
    updateChurchMinistryById
}
export default ChurchMinistryService;