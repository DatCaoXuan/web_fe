import { api } from "../../lib/axios"

async function addBook(book) {
	try {
		const response = await api.post(`book/`, book)
		return response.data
	} catch(e) {
		throw e
	}
}

export default addBook