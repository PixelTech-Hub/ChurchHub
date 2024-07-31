import { CHURCH_MINISTRIES_API_URL } from "../../app/api";
import { ChurchMinistries } from "../../types/ChurchMinistries";


const postNewChurchMinistry = async (ministryData: ChurchMinistries) => {
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
		console.error("Post Church Ministry Error:", error);
		throw error;
	}
};

const getAllChurchServices = async (churchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${ALL_CHURCH_SERVICE_API_URL}/${churchId}`, {
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
		console.error("Get Church Service By ID Error:", error);
		throw error;
	}
};

// New function to get a single church service by ID
const getChurchServiceById = async (serviceId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_SERVICE_API_URL}/${serviceId}`, {
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

// New function to update a church service
const updateChurchService = async (serviceId: string, serviceData: Partial<ChurchServices>) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_SERVICE_API_URL}/${serviceId}`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(serviceData),
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error('Error response body:', errorBody);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Update Church Service Error:", error);
		throw error;
	}
};

// New function to delete a church branch
const deleteChurchService = async (serviceId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_SERVICE_API_URL}/${serviceId}`, {
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
		console.error("Delete Church Service Error:", error);
		throw error;
	}
};

const ChurchService = {
	postNewChurchMinistry,
};

export default ChurchService;
