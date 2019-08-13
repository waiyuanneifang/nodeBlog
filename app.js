const querystring = require("querystring")
const handleBlogRouter = require("./src/router/blog.js")
const handleUserRouter = require("./src/router/user.js")
const { access } = require("./src//utils/log.js")
const { get } = require("./src/db/redis.js")

const getCoolieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	return d.toGMTString()
}

const getPostData = req => {
	return new Promise((resolve, reject) => {
		if (req.method !== "POST") {
			resolve({})
			return
		}
		if (req.headers["content-type"] !== "application/json") {
			resolve({})
			return
		}
		let postData = ""
		req.on("data", chunk => {
			postData += chunk.toString()
		})
		req.on("end", () => {
			if (!postData) {
				resolve({})
			}
			resolve(JSON.parse(postData))
		})
	})
}

const serverHandle = (req, res) => {
	// 记录 access log
	access(
		`${req.method} -- ${req.url} -- ${
			req.headers["user-agent"]
		} -- ${Date.now()}`
	)

	res.setHeader("Content-type", "application/json")

	const url = req.url
	req.path = url.split("?")[0]
	req.query = querystring.parse(url.split("?")[1])

	// 解析cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ""
	cookieStr.split(";").forEach(item => {
		if (!item) return
		const arr = item.split("=")
		const key = arr[0]
		const val = arr[1]
		req.cookie[key] = val
	})

	// 解析session
	let userId = req.cookie.userid
	req.session = {}

	Promise.all([get(userId), getPostData(req)]).then(results => {
		if (userId) {
			req.session = results[0]
		}
		req.body = results[1]
		// 处理bolg路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then(blogData => {
				if (userId) {
					res.setHeader(
						"Set-Cookie",
						`userid=${userId}; path=/; httpOnly; expires=${getCoolieExpires()}`
					)
				}
				res.end(JSON.stringify(blogData))
			})
			return
		}

		// 处理user路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then(userData => {
				if (userId) {
					res.setHeader(
						"Set-Cookie",
						`userid=${userId}; path=/; httpOnly; expires=${getCoolieExpires()}`
					)
				}
				if (userData.data.id) {
					res.setHeader(
						"Set-Cookie",
						`userid=${
							userData.data.id
						}; path=/; httpOnly; expires=${getCoolieExpires()}`
					)
				}
				res.end(JSON.stringify(userData))
			})
			return
		}

		// 未命中路由返回404
		res.writeHead(404, { "Content-type": "text/plain" })
		res.write("404 Not Found\n")
		res.end()
	})
}

module.exports = serverHandle
