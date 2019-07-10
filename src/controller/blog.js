const { exec } = require("../db/mysql.js")

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `
	if (author) {
		sql += `and author='${author}' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%'`
	}
	sql += `order by createTime desc`
	return exec(sql)
}
const getDetail = id => {
	return {
		id: 1,
		title: "标题A",
		content: "内容A",
		createTime: 1546610491112,
		author: "zhangsan"
	}
}

const newBlog = (blogData = {}) => {
	return {
		id: 3
	}
}

const updateBlog = (id, blogData = {}) => {
	return true
}

const deleteBlog = id => {
	return true
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
}
