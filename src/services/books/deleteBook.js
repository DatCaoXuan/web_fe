import { api } from "../../lib/axios"

async function deleteBook(id) {
	try {
		const response = await api.delete(`book/${id}/`)
		return response.data
	} catch(e) {
		throw e
	}
}

export default deleteBook
