import { Message } from "element-ui"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
NProgress.configure({ showSpinner: false })

import { createApp } from "./app"

export const { app, router, store } = createApp({
	// 客户端 router.beforeEach
	clientBeforeEach: ({ router, store }) => {
		router.beforeEach((to, from, next) => {
			if (to.path == "/baidu") {
				return (window.location.href = "https://baidu.com")
			}
			next()
		})
	}
})

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
	if (!window.__INITIAL_STATE__) {
		NProgress.start()
		const matched = router.getMatchedComponents()
		Promise.all(
			matched.map((c) => {
				if (c.asyncData) {
					return c.asyncData({ store, route: router.currentRoute })
				}
			})
		)
			.then(() => {
				NProgress.done()
			})
			.catch((err) => {
				NProgress.done()
				Message.error(err.msg ? err.msg : err)
			})
	}

	// 添加路由钩子函数，用于处理 asyncData.
	// 在初始路由 resolve 后执行，
	// 以便我们不会二次预取(double-fetch)已有的数据。
	// 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)

		// 我们只关心非预渲染的组件
		// 所以我们对比它们，找出两个匹配列表的差异组件
		let diffed = false
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = prevMatched[i] !== c)
		})

		if (!activated.length) {
			return next()
		}

		// loading start
		NProgress.start()

		Promise.all(
			activated.map((c) => {
				if (c.asyncData) {
					return c.asyncData({ store, route: to })
				}
			})
		)
			.then(() => {
				// loading done
				NProgress.done()
				next()
			})
			.catch((err) => {
				// loading done
				NProgress.done()
				Message.error(err.msg ? err.msg : err)
				next(err)
			})
	})

	app.$mount("#app")
})
