const { login } = require("../controller/user.js")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")
const { set } = require("../db/redis.js")

const handleUserRouter = (req, res) => {
	const method = req.method

	if (method === "POST" && req.path === "/api/user/login") {
		const { username, password } = req.body
		const result = login(username, password)
		return result.then(data => {
			if (data) {
				set(data.id, { username, password })
				return new SuccessModel(data)
			}
			return new ErrorModel("登录失败")
		})
	}
}

module.exports = handleUserRouter
