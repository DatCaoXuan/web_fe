import { api } from "../../lib/axios";

async function getBooks(params) {
	try {
		const response = await api.get('book/', { params })
		return response.data
	} catch(e) {
		throw e
	}
}

export default getBooks
