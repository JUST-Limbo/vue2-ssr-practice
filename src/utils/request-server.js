import AxiosClass from "./axiosClass"
export default function (config) {
	const service = new AxiosClass({
		baseURL: process.env.VUE_APP_BASE_API,
		timeout: 1000 * 30,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	})
	return service(config)
}
