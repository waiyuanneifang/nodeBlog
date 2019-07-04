const { getList, getDetail } = require("../controller/blog.js")
const { SuccessModel, ErrorModel } = require("../model/resModel.js")

const handleBlogRouter = (req, res) => {
	const method = req.method

	if (method === "GET" && req.path === "/api/blog/list") {
		const author = req.query.author || ""
		const keyword = req.query.keyword || ""
		const data = getList(author, keyword)
		return new SuccessModel(data)
	}

	if (method === "GET" && req.path === "/api/blog/detail") {
		const id = req.query.id || ""
		const data = getDetail(id)
		return new SuccessModel(data)
	}

	if (method === "POST" && req.path === "/api/blog/new") {
		return {
			msg: "新建博客"
		}
	}

	if (method === "POST" && req.path === "/api/blog/updata") {
		return {
			msg: "更新博客"
		}
	}

	if (method === "POST" && req.path === "/api/blog/del") {
		return {
			msg: "删除博客"
		}
	}
}

module.exports = handleBlogRouter
