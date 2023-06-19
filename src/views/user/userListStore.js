import { queryUserList } from "@/api/user.js"

export default {
	namespaced: true,
	state: () => ({
		userList: [],
		total: 0
	}),
	mutations: {
		set_userList(state, list) {
			state.userList = list
		},
		set_total(state, total) {
			state.total = total
		}
	},
	actions: {
		fetchUserList({ commit }, queryBody) {
			return queryUserList(queryBody).then(({ code, data }) => {
				commit("set_userList", data.data)
				commit("set_total", data.total)
			})
		}
	}
}
