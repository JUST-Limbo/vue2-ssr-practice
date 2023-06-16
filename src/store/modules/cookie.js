export default {
	namespaced: true,
	state: () => ({
		cookie: ""
	}),
	mutations: {
		save_cookie(state, cookie) {
			// console.log("save_cookie", cookie)
			state.cookie = cookie || ""
		}
	}
}
