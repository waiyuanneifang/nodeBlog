const querystring = require("querystring")
const handleBlogRouter = require("./src/router/blog.js")
const handleUserRouter = require("./src/router/user.js")

const serverHandle = (req, res) => {
	res.setHeader("Content-type", "application/json")

	const url = req.url
	req.path = url.split("?")[0]
	req.query = querystring.parse(url.split("?")[1])

	// 处理bolg路由
	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(JSON.stringify(blogData))
		return
	}

	// 处理user路由
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end(JSON.stringify(userData))
		return
	}

	// 未命中路由返回404
	res.writeHead(404, { "Content-type": "text/plain" })
	res.write("404 Not Found\n")
	res.end()
}

module.exports = serverHandle
