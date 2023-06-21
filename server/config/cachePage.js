const cacheAblePages = ["/login"]

module.exports = function (req) {
	const cacheAble = cacheAblePages.some((item) => {
		const pattern = new RegExp(item)
		return pattern.test(req.url)
	})
	if (cacheAble) {
		return req.originalUrl
	} else {
		return false
	}
}
