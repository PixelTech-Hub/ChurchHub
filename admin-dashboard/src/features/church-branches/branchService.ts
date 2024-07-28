import { ALL_CHURCH_BRANCH_API_URL, } from "../../app/api";



const getAllChurchBranches = async (churchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		// console.log('Access token: ' + accessToken);
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${ALL_CHURCH_BRANCH_API_URL}/${churchId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Get Church Branch By ID Error:", error);
        throw error;
    }
};


// const createNewChurchBranch = async (churchBranch: ChurchBranch) => {
// 	const accessToken = localStorage.getItem('accessToken');
// 	try {
// 		const response = await axios.post(CHURCH_BRANCH_API_URL, userData, {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${accessToken}`,
// 			}
// 		});

// 		if (response.status === 201) {
// 			// console.log('Received response:', response.data);
// 			localStorage.setItem('accessToken', response.data.accessToken);
// 			return response.data;
// 		}
// 	} catch (error) {
// 		if (axios.isAxiosError(error)) {
// 			console.error('Error details:', error.response?.data);
// 			console.error('Status code:', error.response?.status);
// 			console.error('Headers:', error.response?.headers);
// 			throw new Error(error.response?.data?.message || 'An error occurred during login');
// 		}
// 		throw new Error('An unexpected error occurred');
// 	}
// };

const ChurchBranchService = {
	getAllChurchBranches,
}

export default ChurchBranchService;