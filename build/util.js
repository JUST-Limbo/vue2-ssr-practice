const portFinderSync = require("portfinder-sync")

function getPort(basePort) {
	return portFinderSync.getPort(basePort)
}

function getServerInfo() {
	return `express/${require("express/package.json").version} ` + `vue-server-renderer/${require("vue-server-renderer/package.json").version}`
}
const serverInfo = getServerInfo()

function SetHeaders(res, headers) {
	const kvs = Object.entries(headers)
	kvs.forEach(([key, val]) => {
		res.setHeader(key, val)
	})
}

module.exports = {
	getServerInfo,
	serverInfo,
	getPort,
	SetHeaders
}
