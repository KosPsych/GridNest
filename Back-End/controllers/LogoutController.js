const db = require('../db')

function logout(req, res) {
	const authHeader = req.headers['x-observatory-auth']
	var user_logout_token = authHeader

	if(!user_logout_token)
		return res.status(401).send('Missing Logout Token')
	else{
		let querry = 'DELETE FROM tokens WHERE accessToken='.concat("'", user_logout_token, "'");
		db.query(querry, (err, result) => {
			if(err) throw "Can't  delete this token from db";
			else
			res.sendStatus(200)
		})
	}
}

module.exports = logout;
