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
		meta: { title: "user" },
		component: () => import("@/views/user/index.vue")
	},
    {
        path:'/login',
        name:'Login',
        meta:{title:'login'},
        component: () => import("@/views/login/index.vue")
    },
	{
		path: "/404",
        name:'404',
		component: () => import("@/views/404"),
		meta: { title: "404" }
	}
]

export function createRouter() {
	return new VueRouter({
		routes,
		mode: "history"
	})
}
