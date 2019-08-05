const { exec } = require("../db/mysql.js")

const login = (username, password) => {
	const sql = `
		select id, username, realname from users where username='${username}' and password='${password}'
	`
	return exec(sql).then(rows => {
		return rows[0]
	})
}

module.exports = {
	login
}
