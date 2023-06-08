const fs = require("fs")
const path = require("path")
const MFS = require("memory-fs")
const webpack = require("webpack")
const chokidar = require("chokidar")
const clientConfig = require("./webpack.client.config")({
	APP_ENV: "development"
})
const serverConfig = require("./webpack.server.config")({
	APP_ENV: "development"
})

const readFile = (fs, file) => {
	try {
		return fs.readFileSync(path.join(clientConfig.output.path, file), "utf-8")
	} catch (e) {
		console.log(e)
	}
}

module.exports = function setupDevServer(app, templatePath, cb) {
	let bundle
	let template
	let clientManifest

	let ready
	const readyPromise = new Promise((r) => {
		ready = r
	})
	const update = () => {
		if (bundle && clientManifest) {
			ready()
			cb(bundle, {
				template,
				clientManifest
			})
		}
	}

	// read template from disk and watch
	template = fs.readFileSync(templatePath, "utf-8")
	chokidar.watch(templatePath).on("change", () => {
		template = fs.readFileSync(templatePath, "utf-8")
		console.log("index.ssr.html template updated.")
		update()
	})

	// modify client config to work with hot middleware
	clientConfig.entry.app = ["webpack-hot-middleware/client", clientConfig.entry.app]
	clientConfig.output.filename = "[name].js"
	clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

	// dev middleware
     console.log("clientCompiler start")
	const clientCompiler = webpack(clientConfig)
	const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		serverSideRender: true
		// noInfo: true
	})
	app.use(devMiddleware)
	clientCompiler.hooks.done.tap("done", (stats) => {
		stats = stats.toJson()
		stats.errors.forEach((err) => console.error(err))
		stats.warnings.forEach((err) => console.warn(err))
		if (stats.errors.length) return
		clientManifest = JSON.parse(readFile(devMiddleware.context.outputFileSystem, "vue-ssr-client-manifest.json"))
		update()
        console.log("clientCompiler success")
	})

	// hot middleware
	app.use(require("webpack-hot-middleware")(clientCompiler, { heartbeat: 5000 }))

	// watch and update server renderer
    console.log("serverCompiler start")
	const serverCompiler = webpack(serverConfig)
	serverCompiler.hooks.done.tap("done", (stats) => {
		console.log("serverCompiler success")
	})
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err
		stats = stats.toJson()
		if (stats.errors.length) return

		// read bundle generated by vue-ssr-webpack-plugin
		bundle = JSON.parse(readFile(mfs, "vue-ssr-server-bundle.json"))
		update()
	})

	return readyPromise
}
