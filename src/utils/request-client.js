import AxiosClass from "./axiosClass"

const service = new AxiosClass({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 1000 * 30,
	headers: {
		"Content-Type": "application/json; charset=utf-8"
	}
})

export default service
