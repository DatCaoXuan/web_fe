import { api } from "../../lib/axios";

async function register(requestBody) {
	try {
		const response = await api.post('auth/register/', requestBody)
		return response.data;
	} catch(e) {
		throw e;
	}
}

export default register