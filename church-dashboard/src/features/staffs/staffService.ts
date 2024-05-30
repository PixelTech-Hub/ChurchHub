import { API_BASE_URL } from "@/app/api";
import { ChurchStaff } from "@/types/ChurchStaff";
import toast from "react-hot-toast";

const createStaffData = async (staffData: ChurchStaff) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church-staffs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staffData)
        });

        if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`Failed to create staff: ${response.status} ${response.statusText}`);
            toast.error(`Failed to create staff: ${response.status} ${response.statusText}`)
        }

        // Parse response JSON data
        const responseData = await response.json();
        console.log('Insight created successfully:', responseData);

        return responseData; // Return the created sermon data
    } catch (error) {
        console.error("Create Staff Error:", error);
        throw error;
    }
};


const getChurchStaffData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/church-staffs`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Staffs Error:", error);
        toast.error("Failed to get data")
        throw error;
    }
};
const deleteChurchStaffData = async (staffId: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church-staffs/${staffId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete staff');
        }

        // console.log("Delete Sermon Response:", response);
        return staffId; // Return the deleted sermonId
    } catch (error) {
        console.error("Delete Staff Error:", error);
        throw error;
    }
};

const updateChurchStaffData = async (staffId: string, updatedData: Partial<ChurchStaff>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/church-staffs/${staffId}`, {
            method: 'PATCH', // Assuming you use PUT method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Failed to update staff');
        }

        return response.json(); // Return the updated sermon data
    } catch (error) {
        console.error("Update Staff Error:", error);
        toast.error("Update Staff Failed");
        throw error;
    }
};

const ChurchStaffService = {
    createStaffData,
    getChurchStaffData,
    deleteChurchStaffData,
    updateChurchStaffData
}
export default ChurchStaffService;