import PureRouterView from "@/layouts/pureRouterView.vue"

export default {
	path: "/usernest",
	component: PureRouterView,
	children: [
		{
			path: "/user",
			name: "User",
			meta: { title: "user" },
			component: () => import("@/views/user/index.vue")
		},
		{
			path: "/userlist",
			name: "Userlist",
			meta: { title: "Userlist" },
			component: () => import("@/views/user/userList.vue")
		},
		{
			path: "/user/:id",
			name: "UserDetail",
			meta: { title: "UserDetail" },
			component: () => import("@/views/user/userDetail.vue")
		}
	]
}
