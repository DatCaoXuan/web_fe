import { api } from "../../lib/axios"

async function updateBook(id, book) {
	try {
		const response = await api.put(`book/${id}/`, book)
		return response.data
	} catch(e) {
		throw e
	}
}

export default updateBook