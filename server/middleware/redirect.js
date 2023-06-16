module.exports = function (req, res, next) {
	if (req.url == "/baidu") {
		return res.redirect("https://baidu.com")
	}
	next()
}
