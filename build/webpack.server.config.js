const { merge } = require("webpack-merge")
const base = require("./webpack.base.config")
const nodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const Dotenv = require("dotenv-webpack")
const CompressionPlugin = require("compression-webpack-plugin")

const fs = require("fs")

delete base.optimization

const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV == "production"
const serverConfig = {
	target: "node",
	devtool: "cheap-module-source-map",
	entry: "./src/entry-server.js",
	output: {
		filename: "server-bundle.js",
		libraryTarget: "commonjs2",
		clean: true // 在生成文件之前清空 output 目录
	},
	optimization: {
		splitChunks: false
	},
	externals: nodeExternals({
		allowlist: [/\.css$/]
	}),
	plugins: [new VueSSRServerPlugin()]
}

module.exports = (env, args) => {
	const APP_ENV = env.APP_ENV || "development"
	serverConfig.plugins.push(
		new Dotenv({
			path: `./envVariable/server/.env.${APP_ENV}`
		})
	)
	if (isProduction) {
		serverConfig.plugins.push(
			new MiniCssExtractPlugin({
				filename: "styles/[name].[contenthash:6].css"
			}),
			new CompressionPlugin({
				test: /\.(css|js)$/,
				minRatio: 0.7
			})
		)
	}
	return merge(base, serverConfig)
}
