const BASE_URL = process.env.REACT_APP_API_URL.replace(/\/+$/g, '')

function toApiUrl(url) {
	return `${BASE_URL}/${url.replace(/^\/+/g, '')}`
}

export default toApiUrl
