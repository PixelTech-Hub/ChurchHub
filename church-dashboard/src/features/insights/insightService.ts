import { API_BASE_URL } from "@/app/api";
import { Insight } from "@/types/Insight";

const createInsightData = async (insightData: Insight) => {
    try {
        const response = await fetch(`${API_BASE_URL}/insights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insightData)
        });

        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Failed to create insight: ${response.status} ${response.statusText}`);
        }

        // Parse response JSON data
        const responseData = await response.json();
        console.log('Insight created successfully:', responseData);

        return responseData; // Return the created sermon data
    } catch (error) {
        console.error("Create Insight Error:", error);
        throw error;
    }
};


const getInsightData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/insights`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Post Contact Error:", error);
        throw error;
    }
};
const deleteInsightData = async (insightId: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/insights/${insightId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete insight');
        }

        // console.log("Delete Sermon Response:", response);
        return insightId; // Return the deleted sermonId
    } catch (error) {
        console.error("Delete Sermon Error:", error);
        throw error;
    }
};

const updateInsightData = async (insightId: string, updatedData: Partial<Insight>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/insights/${insightId}`, {
            method: 'PATCH', // Assuming you use PUT method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Failed to update insight');
        }

        return response.json(); // Return the updated sermon data
    } catch (error) {
        console.error("Update Sermon Error:", error);
        throw error;
    }
};

const insightsService = {
    createInsightData,
    getInsightData,
    updateInsightData,
    deleteInsightData,
}
export default insightsService;