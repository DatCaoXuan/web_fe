import { api } from "../lib/axios";

async function getGenres() {
	try {
		const response = await api.get('genre/')
		return response.data
	} catch(e) {
		throw e
	}
}

export default getGenres
