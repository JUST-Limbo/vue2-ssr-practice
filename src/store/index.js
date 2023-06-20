import Vue from "vue"
import Vuex from "vuex"

import userStore from "@/views/user/userStore"
import userListStore from "@/views/user/userListStore"
import userDetailStore from "@/views/user/userDetailStore.js"
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
			userDetailStore,
			userListStore,
			userStore,
			cookieStore
		}
	})
}
