import { API_BASE_URL } from "@/app/api";
import { ChurchBranches } from "@/types/ChurchBrances";

const createNewChurchBranch = async (branchData: ChurchBranches) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_branches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(branchData)
        });

        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Failed to create new church branch: ${response.status} ${response.statusText}`);
        }

        // Parse response JSON data
        const responseData = await response.json();
        console.log('Church Branch created successfully:', responseData);

        return responseData; // Return the created sermon data
    } catch (error) {
        console.error("Create Insight Error:", error);
        throw error;
    }
};


const getChurchBranchesAll = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_branches`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Church Branch Error:", error);
        throw error;
    }
};
const getChurchBranchId = async (branchId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_branches/${branchId}`)
            .then(response => response.json())

        // Assuming the API response contains the data of the single insight
        return response.data;
    } catch (error) {
        console.error("Get Branch Data Error:", error);
        throw error;
    }
};

const deleteChurchBranches = async (churchBranchId: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_branches/${churchBranchId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete church branch');
        }

        // console.log("Delete Sermon Response:", response);
        return churchBranchId; // Return the deleted sermonId
    } catch (error) {
        console.error("Delete Church Branch Error:", error);
        throw error;
    }
};

const updateChurchBranchById = async (branchId: string, updatedData: Partial<ChurchBranches>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church_branches/${branchId}`, {
            method: 'PATCH', // Assuming you use PUT method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Failed to update church branch');
        }

        return response.json(); // Return the updated sermon data
    } catch (error) {
        console.error("Update Church Branch Error:", error);
        throw error;
    }
};

const ChurchBranchService = {
    createNewChurchBranch,
    getChurchBranchesAll,
    getChurchBranchId,
    updateChurchBranchById,
    deleteChurchBranches
}
export default ChurchBranchService;