import { queryUserDetailById } from "@/api/user.js"

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
		queryUserDetailById({ commit, rootState }, { id }) {
			return queryUserDetailById({ id })
				.then((res) => {
					commit("set_userdetail", res.data)
				})
				.catch((err) => {
					if (err.code == 500) {
						return Promise.reject({
							path: "/404",
                            ...err
						})
					}
					return Promise.reject(err)
				})
		}
	}
}
