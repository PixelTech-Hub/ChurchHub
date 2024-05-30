import { API_BASE_URL } from "@/app/api";
import { ChurchService } from "@/types/ChurchService";

const createNewChurchService = async (data: ChurchService) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Failed to create new church service: ${response.status} ${response.statusText}`);
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


const getChurchServices = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_services`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Church Service Error:", error);
        throw error;
    }
};


const deleteChurchService = async (churchServiceId: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_services/${churchServiceId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete church service');
        }

        // console.log("Delete Sermon Response:", response);
        return churchServiceId; // Return the deleted sermonId
    } catch (error) {
        console.error("Delete Church Service Error:", error);
        throw error;
    }
};

const updateChurchServiceById = async (serviceId: string, updatedData: Partial<ChurchService>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_branches/${serviceId}`, {
            method: 'PATCH', // Assuming you use PUT method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Failed to update church service');
        }

        return response.json(); // Return the updated sermon data
    } catch (error) {
        console.error("Update Church Service Error:", error);
        throw error;
    }
};

const ChurchServiceData = {
    createNewChurchService,
    getChurchServices,
    deleteChurchService,
    updateChurchServiceById
}
export default ChurchServiceData;