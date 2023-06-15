## 复现步骤

分别执行指令

```shell
npm  run dev  // dev
npm run preview // build+预览
```

访问`http://localhost:9500/user`和`http://localhost:9501/user`

9500的控制台报错

```shell
error during render : /user
TypeError: String.prototype.startsWith called on null or undefined
    at startsWith (<anonymous>)
    at Object.pathToFileURL (node:internal/url:1473:20)
    at server-bundle.js:1020:51
    at server-bundle.js:1058:13
    at Object.<anonymous> (server-bundle.js:1117:12)
    at evaluateModule (G:\code\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.dev.js:9351:21)
    at G:\code\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.dev.js:9409:18   
    at new Promise (<anonymous>)
    at G:\code\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.dev.js:9401:14   
    at Object.renderToString (G:\code\vue2-ssr-practice\node_modules\.pnpm\vue-server-renderer@2.6.14\node_modules\vue-server-renderer\build.dev.js:9577:9)
    at render (G:\code\vue2-ssr-practice\server\index.js:117:11)
    at G:\code\vue2-ssr-practice\server\index.js:133:29
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

9501的控制台不报错

定位到导致错误的代码是

```js
// app.js
import "element-ui/lib/theme-chalk/index.css"
```

这里初步判断是`css`解析问题，尝试在`app.js`中导入`/styles/testcssinappjs.css`，同时注释`import "element-ui/lib/theme-chalk/index.css"`，发现报错消失

```js
import "./styles/testcssinappjs.css"

import ElementUI from "element-ui"
// import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
```

在`app.js`中`theme-chalk/index.css`解析报错，但是其他`css`文件能解析成功

推测：`vue-style-loader`对`theme-chalk/index.css`这个文件的解析出现异常。

## 解决方案

思路就是：颗粒化特殊处理，不使用`vue-style-loader`解析`theme-chalk/index.css`，转而使用`MiniCssExtractPlugin.loader`

```js
					{
						test: /\.css$/i,
						include: [/element-ui/],
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									importLoaders: 1
								}
							},
							"postcss-loader"
						]
					},
					{
						test: /\.css$/i,
						exclude: [/element-ui/],
						use: [
							stylesHandler,
							{
								loader: "css-loader",
								options: {
									importLoaders: 1
								}
							},
							"postcss-loader"
						]
					},
```

## 问题

未论证过是`vue-style-loader`本身的问题，还是`theme-chalk/index.css`内容的问题

未尝试过使用`style-loader`替换`vue-style-loader`

目前流传的观点是`MiniCssExtractPlugin.loader`不支持`hmr`热更新，而`style-loader和vue-style-loader`是支持的，但是我试了一下`MiniCssExtractPlugin.loader`也是能热更新的，或许是我的测试用例不充分？