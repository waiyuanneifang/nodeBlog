const handleBlogRouter = (req, res) => {
	const method = req.method
	const url = req.url
	const path = url.split("?")[0]

	if (method === "GET" && path === "/api/blog/list") {
		return {
			msg: "获取博客列表"
		}
	}

	if (method === "GET" && path === "/api") {
		return {
			msg: "获取博客详情"
		}
	}
}
