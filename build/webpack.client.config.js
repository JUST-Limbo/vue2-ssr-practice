const { merge } = require("webpack-merge")
const base = require("./webpack.base.config")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const Dotenv = require("dotenv-webpack")
const CompressionPlugin = require("compression-webpack-plugin")
const WebpackBar = require("webpackbar")

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV == "production"

const clientConfig = {
	entry: {
		app: "./src/entry-client.js"
	},
	resolve: {
		alias: {
			axiosInstance: "@/utils/request-client.js"
		}
	},
	plugins: [
		new VueSSRClientPlugin(),
		new WebpackBar({
			name: "Client",
			color: "#7ED321"
		})
	]
}

module.exports = (env, args) => {
	const APP_ENV = env.APP_ENV || "development"
	clientConfig.plugins.push(
		new Dotenv({
			path: `./envVariable/client/.env.${APP_ENV}`
		})
	)
	if (isProd) {
		clientConfig.devtool = false
		clientConfig.plugins.push(
			new MiniCssExtractPlugin({
				filename: "styles/[name].[contenthash:6].css"
			}),
			new CompressionPlugin({
				test: /\.(css|js)$/,
				minRatio: 0.7
			})
		)
	} else {
		clientConfig.plugins.push(
			new MiniCssExtractPlugin({
				filename: "styles/[name].css"
			})
		)
		clientConfig.devtool = "cheap-module-source-map"
	}
	return merge(base, clientConfig)
}
