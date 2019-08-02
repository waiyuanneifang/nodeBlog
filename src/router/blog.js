const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
} = require("../controller/blog.js")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")

const logincheck = req => {
	if (!req.session.username) {
		return Promise.resolve(new ErrorModel("尚未登录"))
	}
}

const handleBlogRouter = (req, res) => {
	const method = req.method

	if (method === "GET" && req.path === "/api/blog/list") {
		let author = req.query.author || ""
		const keyword = req.query.keyword || ""
		if (req.query.isadmin) {
			const logincheckResult = logincheck(req)
			if (logincheckResult) {
				return logincheckResult
			}
			author = req.session.username
		}

		const result = getList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData)
		})
	}

	if (method === "GET" && req.path === "/api/blog/detail") {
		const id = req.query.id || ""
		const result = getDetail(id)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	if (method === "POST" && req.path === "/api/blog/new") {
		const logincheckResult = logincheck(req)
		if (logincheckResult) {
			return logincheckResult
		}

		req.body.author = req.session.username
		const result = newBlog(req.body)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	if (method === "POST" && req.path === "/api/blog/update") {
		const logincheckResult = logincheck(req)
		if (logincheckResult) {
			return logincheckResult
		}

		const id = req.query.id
		const result = updateBlog(id, req.body)
		return result.then(data => {
			if (data) {
				return new SuccessModel()
			} else {
				return new ErrorModel("更新失败")
			}
		})
	}

	if (method === "POST" && req.path === "/api/blog/delete") {
		if (logincheckResult) {
			return logincheckResult
		}

		const id = req.query.id
		const author = req.session.username
		const result = deleteBlog(id, author)
		return result.then(data => {
			if (data) {
				return new SuccessModel()
			} else {
				return new ErrorModel("删除失败")
			}
		})
	}
}

module.exports = handleBlogRouter
