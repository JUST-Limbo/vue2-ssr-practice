this.addEventListener("install", function (event) {
	console.log("Service Worker install")
})

this.addEventListener("activate", function (event) {
	console.log("Service Worker activate")
})
