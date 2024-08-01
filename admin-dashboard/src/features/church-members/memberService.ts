import { ALL_CHURCH_MINISTRIES_API_URL, CHURCH_MINISTRIES_API_URL } from "../../app/api";
import { ChurchMinistries } from "../../types/ChurchMinistries";


const postNewChurchMember = async (memberData: ChurchMinistries) => {
	try {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MINISTRIES_API_URL}`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(memberData),
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error('Error response body:', errorBody);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Post Church Member Error:", error);
		throw error;
	}
};

const getAllChurchMinistries = async (churchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${ALL_CHURCH_MINISTRIES_API_URL}/${churchId}`, {
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
		console.error("Get Church Ministy By ID Error:", error);
		throw error;
	}
};

// New function to get a single church ministry by ID
const getChurchMinistryById = async (ministryId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MINISTRIES_API_URL}/${ministryId}`, {
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
		console.error("Get Single Church Ministry Error:", error);
		throw error;
	}
};

// New function to update a church ministry
const updateChurchMinistry = async (ministryId: string, ministryData: Partial<ChurchMinistries>) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MINISTRIES_API_URL}/${ministryId}`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(ministryData),
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error('Error response body:', errorBody);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Update Church Ministry Error:", error);
		throw error;
	}
};

// New function to delete a church ministry
const deleteChurchMinistry = async (ministryId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MINISTRIES_API_URL}/${ministryId}`, {
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
		console.error("Delete Church Ministry Error:", error);
		throw error;
	}
};

const ChurchMemberService = {
	postNewChurchMember,
};

export default ChurchMemberService;
