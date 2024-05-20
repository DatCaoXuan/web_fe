import { api } from "../../lib/axios";

async function getProfile(userId) {
	try {
		const response = await api.get(`auth/profile/${userId}/`)
		return response.data;
	} catch(e) {
		throw e;
	}
}

export default getProfile