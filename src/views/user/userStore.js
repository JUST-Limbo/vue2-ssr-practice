import { atClient, atServer } from '@/utils/index.js'
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
                if (atServer) {
                    if(res.code == 401){
                        return Promise.reject({
                            url: `/login?redirectUrl=${encodeURIComponent('/user')}`,
                        });
                    }else if(res.code == 404){
                        return Promise.reject({
                            url:'/404'
                        })
                    }
                }
				commit("setUserInfo", res)
			})
		}
	}
}
