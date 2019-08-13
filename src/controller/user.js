const { exec, escape } = require("../db/mysql.js")
const { genPassWord } = require("../utils/cryp.js")
const { set } = require("../db/redis.js")

const login = (username, password) => {
	username = escape(username)
	password = genPassWord(password)
	password = escape(password)
	const sql = `
		select id, username, realname from users where username=${username} and password=${password}
	`
	return exec(sql).then(rows => {
		const obj = rows[0]
		set("userId", { username: obj.username, realname: obj.realname })
		return obj
	})
}

module.exports = {
	login
}
