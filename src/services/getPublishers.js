import { api } from "../lib/axios";

async function getPublishers() {
	try {
		const response = await api.get('publisher/')
		return response.data
	} catch(e) {
		throw e
	}
}

export default getPublishers