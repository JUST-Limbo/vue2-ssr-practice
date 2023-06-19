import Vue from "vue"
import VueRouter from "vue-router"

import useRoutes from "./modules/user"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/Home.vue")
	},
	useRoutes,
	{
		path: "/login",
		name: "Login",
		meta: { title: "login" },
		component: () => import("@/views/login/index.vue")
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/404"),
		meta: { title: "404" }
	},
	{ path: "*", redirect: "/404" }
]

// 跳转相同路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch((err) => err)
}
// replace相同路由报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
	if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
	return originalReplace.call(this, location).catch((err) => err)
}

export function createRouter() {
	return new VueRouter({
		routes,
		mode: "history"
	})
}
