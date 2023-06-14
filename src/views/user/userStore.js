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
			}).then((res) => {
				commit("setUserInfo", res)
			})
		}
	}
}
