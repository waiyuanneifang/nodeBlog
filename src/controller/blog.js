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
	let sql = `select * from blogs where id='${id}'`
	return exec(sql)
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
