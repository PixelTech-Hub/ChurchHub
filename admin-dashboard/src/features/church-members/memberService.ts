import { ALL_CHURCH_MEMBERS_API_URL, CHURCH_MEMBERS_API_URL } from "../../app/api";
import { ChurchMembers } from "../../types/ChurchMember";



const postNewChurchMember = async (memberData: ChurchMembers) => {
	try {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MEMBERS_API_URL}`, {
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
		console.error("Post Church MEMBER Error:", error);
		throw error;
	}
};

const getAllChurchMembers = async (churchId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${ALL_CHURCH_MEMBERS_API_URL}/${churchId}`, {
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
		console.error("Get Church Member By ID Error:", error);
		throw error;
	}
};

// New function to get a single church member by ID
const getChurchMemberById = async (memberId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MEMBERS_API_URL}/${memberId}`, {
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
		console.error("Get Single Church Member Error:", error);
		throw error;
	}
};

// New function to update a church member
const updateChurchMember = async (memberId: string, memberData: Partial<ChurchMembers>) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MEMBERS_API_URL}/${memberId}`, {
			method: 'PATCH',
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
		console.error("Update Church Ministry Error:", error);
		throw error;
	}
};

// New function to delete a church member
const deleteChurchMember = async (memberId: string) => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		if (!accessToken) {
			throw new Error('No access token found');
		}

		const response = await fetch(`${CHURCH_MEMBERS_API_URL}/${memberId}`, {
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
	getAllChurchMembers,
	getChurchMemberById,
	updateChurchMember,
	deleteChurchMember
};

export default ChurchMemberService;
