import { getUserInfo } from "@/api/user.js"

export default {
	namespaced: true,
	state: () => ({
		userInfo: {}
	}),
	getters: {},
	mutations: {},
	actions: {
		getUserInfo({ rootState }) {
			return getUserInfo({
                cookie: rootState.cookieStore.cookie,
            }).then((res) => {
                console.log(res);
            });
		}
	}
}
