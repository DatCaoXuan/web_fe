import { api } from "../../lib/axios";

async function login(username, password, remember) {
	try {
		const response = await api.post('auth/login/', { username, password, remember })
		return { ...response.data, remember };
	} catch(e) {
		throw e;
	}
}

export default login;