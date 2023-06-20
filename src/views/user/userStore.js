import { getUserInfo } from "@/api/user.js"

export default {
	namespaced: true,
	state: () => ({
		userInfo: {}
	}),
	getters: {},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		getUserInfo({ rootGetters, commit }) {
			return getUserInfo({
				cookie: rootGetters.cookie
			})
				.then((res) => {
					commit("setUserInfo", res.data)
				})
				.catch((err) => {
					if (err.code == 401) {
						return Promise.reject({
							path: `/login?redirectUrl=${encodeURIComponent("/user")}`
						})
					} else if (err.code == 404) {
						return Promise.reject({
							path: "/404"
						})
					}
                    return Promise.reject(err)
				})
		}
	}
}
