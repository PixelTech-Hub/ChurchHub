import { API_BASE_URL } from "../../app/api";


const getAllChurches = async () => {
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

const getChurchById = async (id: string) => {
	try {
		const response = await fetch(`${API_BASE_URL}/churches/${id}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error("Get Single Church Error:", error);
		throw error;
	}
};

const churchService = {
	getAllChurches,
	getChurchById
};

export default churchService;