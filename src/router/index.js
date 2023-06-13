import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/Home.vue")
	},
	{
		path: "/user",
		name: "User",
		component: () => import("@/views/user/index.vue")
	}
]

export function createRouter() {
	return new VueRouter({
		routes,
		mode: "history"
	})
}
