import REQUEST from "axiosInstance"

export function getUserInfo(headers) {
	return REQUEST({
		url: "/userinfo",
		method: "get",
		headers
	})
}
