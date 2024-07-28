import { ALL_CHURCH_BRANCH_API_URL, CHURCH_BRANCH_API_URL } from "../../app/api";
import { ChurchBranch } from "../../types/ChurchBranches";

const postNewChurchBranch = async (branchData: ChurchBranch) => {
	try {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_BRANCH_API_URL}`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(branchData),
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error('Error response body:', errorBody);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Post Church Branch Error:", error);
		throw error;
	}
};

const getAllChurchBranches = async (churchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
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

// New function to get a single church branch
const getChurchBranchById = async (branchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_BRANCH_API_URL}/${branchId}`, {
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
		console.error("Get Single Church Branch Error:", error);
		throw error;
	}
};

// New function to update a church branch
const updateChurchBranch = async (branchId: string, branchData: Partial<ChurchBranch>) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_BRANCH_API_URL}/${branchId}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(branchData),
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error('Error response body:', errorBody);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Update Church Branch Error:", error);
		throw error;
	}
};

// New function to delete a church branch
const deleteChurchBranch = async (branchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_BRANCH_API_URL}/${branchId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		console.error("Delete Church Branch Error:", error);
		throw error;
	}
};

const ChurchBranchService = {
	getAllChurchBranches,
	postNewChurchBranch,
	getChurchBranchById,
	updateChurchBranch,
	deleteChurchBranch
};

export default ChurchBranchService;
