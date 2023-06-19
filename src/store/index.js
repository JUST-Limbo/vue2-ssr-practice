import Vue from "vue"
import Vuex from "vuex"

import userStore from "@/views/user/userStore"
import userListStore from "@/views/user/userListStore"
import cookieStore from "./modules/cookie"

Vue.use(Vuex)

export function createStore() {
	return new Vuex.Store({
		state: {},
		getters: {
			cookie(state) {
				return state.cookieStore.cookie
			}
		},
		mutations: {},
		actions: {},
		modules: {
            userListStore,
			userStore,
			cookieStore
		}
	})
}
