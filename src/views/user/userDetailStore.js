import { queryUserDetailById } from "@/api/user.js"
import { atClient, atServer } from "@/utils/index.js"

export default {
	namespaced: true,
	state: () => ({
		userDetail: {}
	}),
	mutations: {
		set_userdetail(state, userDetail) {
			state.userDetail = userDetail
		}
	},
	actions: {
		queryUserDetailById({ commit }, params) {
			return queryUserDetailById(params).then((res) => {
				if (atServer) {
					if (res.code == 500) {
						return Promise.reject({
							url: "/404"
						})
					}
				}
				commit("set_userdetail", res.data)
			})
		}
	}
}
