import axios from "axios"

export default class AxiosClass {
	constructor(config) {
		const axiosInstance = axios.create(config)
		// 请求拦截器
		axiosInstance.interceptors.request.use(
			(config) => {
				return config
			},
			(err) => {
				return Promise.reject(err)
			}
		)
		// 响应拦截器
		axiosInstance.interceptors.response.use(
			(res) => {
				return res.data
			},
			(err) => {
				return Promise.reject(err)
			}
		)
		return axiosInstance
	}
}
