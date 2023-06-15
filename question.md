## 复现步骤

`/utils/request-server.js`

```js
import axios from "axios"

export default function (apiConfig) {
	const axiosInstance = axios.create({
		baseURL: process.env.VUE_APP_BASE_API,
		timeout: 1000 * 30,
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		}
	})
	// 请求拦截器
	axiosInstance.interceptors.request.use(
		(config) => {
			return config
		},
		(err) => {
			return Promise.reject(err)
		}
	)
	// 响应拦截器
	axiosInstance.interceptors.response.use(
		(res) => {
			return res.data
		},
		(err) => {
			return Promise.reject(err)
		}
	)
	return axiosInstance(apiConfig)
}

```

上述代码在编译完成后，在`server`端发起请求，控制台会报

```shell
Error [ERR_REQUIRE_ESM]: require() of ES Module C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\axios@1.4.0\node_modules\axios\index.js from C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js not supported.
Instead change the require of index.js in C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js to a dynamic import() which is available in all CommonJS modules.
    at C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js:1:77882
    at server-bundle.js:1:2411
    at server-bundle.js:1:3982
    at Object.<anonymous> (server-bundle.js:1:4003)
    at o (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js:1:77799)
    at C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js:1:78392
    at new Promise (<anonymous>)
    at C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js:1:78300
    at Object.renderToString (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.prod.js:1:81835)
    at render (C:\personalCode\vue2-ssr-practice\server\index.js:117:11)
    at Layer.handle [as handle_request] (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\route.js:144:13)
    at Route.dispatch (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\route.js:114:3)
    at Layer.handle [as handle_request] (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\layer.js:95:5)
    at C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\index.js:284:15
    at param (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\index.js:365:14)
    at param (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\index.js:376:14)
    at Function.process_params (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\index.js:421:3)
    at next (C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\express@4.18.2\node_modules\express\lib\router\index.js:280:10)
    at C:\personalCode\vue2-ssr-practice\node_modules\.pnpm\route-cache@0.5.0\node_modules\route-cache\index.js:165:9

```

结合资料，已知本地安装的`axios`为v1.4，`nodejs`为v16

[require not supported after upgrading to axios 1.1.2 · Issue #5091 · axios/axios (github.com)](https://github.com/axios/axios/issues/5091)

[Refactored module exports; by DigitalBrainJS · Pull Request #5162 · axios/axios (github.com)](https://github.com/axios/axios/pull/5162)

[CommonJS usage broken in v1.0.0 · Issue #5032 · axios/axios (github.com)](https://github.com/axios/axios/issues/5032)

[Fix commonjs & umd exports by ivanpepelko · Pull Request #5030 · axios/axios (github.com)](https://github.com/axios/axios/pull/5030)

[Nuxt 2.X can't import Axios · Issue #5243 · axios/axios (github.com)](https://github.com/axios/axios/issues/5243)

可以得出一些结论

1. `axios`在v1和v0的版本导出有区别
2. 在`bundle.json`中会尝试导入`esmodule`的`axios`

尝试修改代码

```js
import axios from "axios/dist/node/axios.cjs"
```

会发现首次构建`npm run dev`是有效的，每次间隔一段时间反复中断进程再构建，则`Error [ERR_REQUIRE_ESM]: require() of ES Module`再次出现。

这可能是因为二次构建时`axios/dist/node/axios.cjs`没有顺利命中缓存或没有顺利导入期望的文件？

`cache`的配置如下

```js
cache: {
    type: "filesystem",
    buildDependencies: {
        config: [__filename]
    }
},
```

如果将`buildDependencies`配置去除，则会报

```shell
ERROR in ./src/utils/request-server.js 1:0-46
Module not found: Error: Package path ./dist/node/axios.cjs is not exported from package C:\personalCode\vue2-ssr-practice\node_modules\axios (see exports field in C:\personalCode\vue2-ssr-practice\node_modules\axios\package.json)
 @ ./src/api/user.js 1:0-36 3:9-16
 @ ./src/views/user/userStore.js 1:0-60 19:13-25
 @ ./src/store/index.js 3:0-47 17:17-26
 @ ./src/app.js 4:0-38 11:14-25
 @ ./src/entry-client.js 2:0-34 34:17-26

webpack compiled with 1 error
```

猜测，`cache.type`为`filesystem`会导致`axios`这个包命中缓存异常。

尝试将`cache`改为`cache:true`或将`cache.type`改为`memory`，初次构建正常，再次构建正常

综上所述，该问题可能是`axios`版本和`cache.type`导致的，为了解决这个问题，可以尝试将`axios`降到v0或将`cache.type`改为`memory`





