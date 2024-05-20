import axios from 'axios'

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 5000,
})

axiosClient.interceptors.request.use(request => {
	const token = localStorage.getItem('token') || sessionStorage.getItem('token');
	if (token) {
		request.headers.Authorization = `Bearer ${token}`;
	}
	return request;
});

export { axiosClient as api }
