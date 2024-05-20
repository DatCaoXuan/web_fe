import { api } from "../../lib/axios";

async function getBook(slug) {
	try {
		const response = await api.get(`book/${slug}`)
		return response.data
	} catch(e) {
		throw e
	}
}

export default getBook