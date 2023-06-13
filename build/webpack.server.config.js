const { merge } = require("webpack-merge")
const base = require("./webpack.base.config")
const nodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const Dotenv = require("dotenv-webpack")
const CompressionPlugin = require("compression-webpack-plugin")
const WebpackBar = require("webpackbar")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const chalk = require("chalk")
const { defaultPort } = require("./setting")
const address = require("address")

// Error: Server-side bundle should have one single entry file. Avoid using CommonsChunkPlugin in the server config.
delete base.optimization

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV == "production"
const serverConfig = {
	target: "node",
	devtool: "cheap-module-source-map",
	entry: "./src/entry-server.js",
	output: {
		filename: "server-bundle.js",
		libraryTarget: "commonjs2",
		// clean: true // 在生成文件之前清空 output 目录
	},
	optimization: {
		splitChunks: false
	},
	externals: nodeExternals({
		allowlist: [/\.css$/]
	}),
	resolve: {
		alias: {
			axiosInstance: "@/utils/request-server.js"
		}
	},
	plugins: [
		new VueSSRServerPlugin(),
		new WebpackBar({
			name: "Server",
			color: "#F5A623"
		})
	]
}

module.exports = (env, args) => {
	const APP_ENV = env.APP_ENV || "development"
	serverConfig.plugins.push(
		new Dotenv({
			path: `./envVariable/server/.env.${APP_ENV}`
		})
	)
	if (isProd) {
		serverConfig.plugins.push(
			new MiniCssExtractPlugin({
				filename: "styles/[name].[contenthash:6].css"
			}),
			new CompressionPlugin({
				test: /\.(css|js)$/,
				minRatio: 0.7
			})
		)
	} else {
		const port = args.port || defaultPort
		const LOCAL_IP = address.ip()
		serverConfig.plugins.push(
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [`  App running at:`, `  - Local:   ` + chalk.cyan(`http://localhost:${port}`), `  - Network: ` + chalk.cyan(`http://${LOCAL_IP}:${port}`)]
				},
				clearConsole: true
			})
		)
	}
	return merge(base, serverConfig)
}
