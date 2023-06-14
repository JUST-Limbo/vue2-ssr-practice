import Vue from "vue"
import Vuex from "vuex"

import userStore from "@/views/user/userStore"
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
			userStore,
			cookieStore
		}
	})
}
