import { API_BASE_URL } from "@/app/api";

// const createNewChurchBranch = async (data: Church) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/churches`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         if (!response.ok) {
//             // Handle non-successful responses
//             throw new Error(`Failed to create new church: ${response.status} ${response.statusText}`);
//         }

//         // Parse response JSON data
//         const responseData = await response.json();
//         console.log('Church created successfully:', responseData);

//         return responseData; // Return the created sermon data
//     } catch (error) {
//         console.error("Create Church Error:", error);
//         throw error;
//     }
// };


const getChurches = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/churches`)
            .then(response => response.json())

        // console.log("Post Contact Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Church Error:", error);
        throw error;
    }
};
// const getChurchBranchId = async (branchId: string) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/church_branches/${branchId}`)
//             .then(response => response.json())

//         // Assuming the API response contains the data of the single insight
//         return response.data;
//     } catch (error) {
//         console.error("Get Branch Data Error:", error);
//         throw error;
//     }
// };

// const deleteChurchBranches = async (churchBranchId: any) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/insights/${churchBranchId}`, {
//             method: 'DELETE'
//         });

//         if (!response.ok) {
//             throw new Error('Failed to delete church branch');
//         }

//         // console.log("Delete Sermon Response:", response);
//         return churchBranchId; // Return the deleted sermonId
//     } catch (error) {
//         console.error("Delete Church Branch Error:", error);
//         throw error;
//     }
// };

// const updateChurchBranchById = async (insightId: string, updatedData: Partial<ChurchBranches>) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/insights/${insightId}`, {
//             method: 'PATCH', // Assuming you use PUT method for updating
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(updatedData)
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update insight');
//         }

//         return response.json(); // Return the updated sermon data
//     } catch (error) {
//         console.error("Update Sermon Error:", error);
//         throw error;
//     }
// };

const ChurchService = {
    getChurches,
}
export default ChurchService;