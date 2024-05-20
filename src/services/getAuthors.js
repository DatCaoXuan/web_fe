import { api } from "../lib/axios";

async function getAuthors() {
	try {
		const response = await api.get('author/')
		return response.data
	} catch(e) {
		throw e
	}
}

export default getAuthors