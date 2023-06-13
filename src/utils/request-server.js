import axios from 'axios/dist/node/axios.cjs';
// import axios from 'axios'

export default function (config) {
	const service = axios.create({
		baseURL: process.env.VUE_APP_BASE_API,
		timeout: 1000 * 30,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	})
	return service(config)
}
