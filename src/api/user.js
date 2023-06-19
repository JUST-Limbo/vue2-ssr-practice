import REQUEST from "axiosInstance"

export function getUserInfo(headers) {
	return REQUEST({
		url: "/userinfo",
		method: "get",
		headers
	})
}

export function queryUserList(data) {
	return REQUEST({
		url: "/queryuserlist",
		method: "post",
		data
	})
}
