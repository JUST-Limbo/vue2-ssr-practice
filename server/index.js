const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const address = require("address")
const { LRUCache } = require("lru-cache")
const express = require("express")
const favicon = require("serve-favicon")
const compression = require("compression")
const microcache = require("route-cache")
const resolve = (file) => path.resolve(__dirname, file)
const { createBundleRenderer } = require("vue-server-renderer")
const isProd = process.env.NODE_ENV === "production"
const useMicroCache = process.env.MICRO_CACHE !== "false"
// const useMicroCache = true
const isCacheable = require("./config/cachePage")

const midWares = require("./middleware/index")

const { getPort, serverInfo, SetHeaders } = require("../build/util")
const { defaultPort } = require("../build/setting")
const port = getPort(process.env.PORT || defaultPort)

const app = express()

function createRenderer(bundle, options) {
	// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
	return createBundleRenderer(
		bundle,
		Object.assign(options, {
			// for component caching
			cache: new LRUCache({
				max: 1000,
				maxAge: 1000 * 60 * 15
			}),
			// this is only needed when vue-server-renderer is npm-linked
			basedir: resolve("../dist"),
			// recommended for performance
			runInNewContext: false
		})
	)
}

let renderer
let readyPromise
const templatePath = resolve("../public/index.ssr.html")
if (isProd) {
	// In production: create server renderer using template and built server bundle.
	// The server bundle is generated by vue-ssr-webpack-plugin.
	const template = fs.readFileSync(templatePath, "utf-8")
	const bundle = require("../dist/vue-ssr-server-bundle.json")
	// The client manifests are optional, but it allows the renderer
	// to automatically infer preload/prefetch links and directly add <script>
	// tags for any async chunks used during render, avoiding waterfall requests.
	const clientManifest = require("../dist/vue-ssr-client-manifest.json")
	renderer = createRenderer(bundle, {
		template,
		clientManifest
	})
} else {
	// In development: setup the dev server with watch and hot-reload,
	// and create a new renderer on bundle / index template update.
	readyPromise = require("../build/setup-dev-server")(
		app,
		templatePath,
		(bundle, options) => {
			renderer = createRenderer(bundle, options)
		},
		port
	)
}

const serve = (path, cache) => {
	return express.static(resolve(path), {
		maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
	})
}

app.use(compression({ threshold: 0 }))
app.use(favicon("./public/favicon.ico"))
app.use("/dist", serve("../dist", true))
app.use("/public", serve("../public", true))
app.use("/manifest.json", serve("../dist/manifest.json", true))
// 缓存
// app.use("/service-worker.js", serve("../dist/service-worker.js"))

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
// cache 1 hour
app.use(microcache.cacheSeconds(1 * 60 * 60, (req) => useMicroCache && isCacheable(req)))
// 拦截器? 比如根据ua重定向pc和移动端
app.use(...midWares)

function render(req, res) {
	const s = Date.now()

	SetHeaders(res, {
		"Content-Type": "text/html",
		Server: serverInfo
	})

	const handleError = (err) => {
		if (err.path) {
			res.redirect(err.path)
		} else if (err.code === 404) {
			res.status(404).send("404 | Page Not Found")
		} else {
			// Render Error Page or Redirect
			res.status(500).send("500 | Internal Server Error")
			console.error(`error during render : ${req.url}`)
			console.error(err.stack)
		}
	}

	const context = {
		title: "Vue HN 2.0", // default title
		url: req.url,
		cookie: req.headers.cookie
	}
	// console.log(req.url)
	renderer.renderToString(context, (err, html) => {
		if (err) {
			return handleError(err)
		}
		res.send(html)
		if (!isProd) {
			// console.log(`whole request: ${Date.now() - s}ms`)
		}
	})
}

// page route is here
app.get(
	"*",
	isProd
		? render
		: (req, res) => {
				readyPromise.then(() => render(req, res))
		  }
)
app.listen(port, () => {
	if (isProd) {
		const appRuningStr = chalk.green("App running at")
		const LOCAL_IP = address.ip()
		const localStr = chalk.green("Local:  ") + chalk.cyan(`http://localhost:${port}`)
		const netWorkStr = chalk.green("Network:") + chalk.cyan(`http://${LOCAL_IP}:${port}`)
		console.log(appRuningStr)
		console.log(localStr)
		console.log(netWorkStr)
	}
})
