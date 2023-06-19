import axios from "axios/dist/node/axios.cjs"

export default function (apiConfig) {
	const axiosInstance = axios.create({
		baseURL: process.env.VUE_APP_BASE_API,
		timeout: 1000 * 30,
		withCredentials: true,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	})
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
	return axiosInstance(apiConfig)
}
