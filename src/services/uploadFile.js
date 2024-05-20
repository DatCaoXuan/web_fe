import { api } from "../lib/axios";

async function uploadFile(file, filename, path) {
	const formData = { path, file }

	try {
		const response = await api.post('upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
				'Content-Disposition': `form-data; name="file"; filename="${filename}"`
            }
        })
		return response.data?.data ?? ''
	} catch(e) {
		throw e
	}
}

export default uploadFile