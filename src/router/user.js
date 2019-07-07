const { loginchunk } = require("../controller/user.js")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")

const handleUserRouter = (req, res) => {
	const method = req.method

	if (method === "POST" && req.path === "/api/user/login") {
		const { username, password } = req.body
		const data = loginchunk(username, password)
		if (data) {
			return new SuccessModel()
		}
		return new ErrorModel("登录失败")
	}
}

module.exports = handleUserRouter
