const { login } = require("../controller/user.js")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")

const handleUserRouter = (req, res) => {
	const method = req.method

	if (method === "POST" && req.path === "/api/user/login") {
		const { username, password } = req.body
		const result = login(username, password)
		return result.then(data => {
			if (data) {
				return new SuccessModel(data)
			}
			return new ErrorModel("登录失败")
		})
	}

	if (method === "GET" && req.path === "/api/user/test-login") {
		const { username, password } = req.query
		const result = login(username, password)
		return result.then(data => {
			if (data) {
				req.session.username = data.username
				req.session.realname = data.realname
				return new SuccessModel({
					session: req.session
				})
			}
			return new ErrorModel("登录失败")
		})
	}
}

module.exports = handleUserRouter
