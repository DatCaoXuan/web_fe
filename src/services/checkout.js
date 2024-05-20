import { api } from "../lib/axios";

async function checkout(requestBody) {
	try {
		const response = await api.post(`order/checkout/`, requestBody)
		return response.data
	} catch(e) {
		throw e
	}
}

export default checkout