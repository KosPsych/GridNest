const db = require('../db')
var fs = require('fs')

function logout(req, res) {
	const authHeader = req.headers['x-observatory-auth']
	var user_logout_token = authHeader

	if(!user_logout_token)
		return res.status(401).send('Missing Logout Token')
	else{
		var dir = './Tokens'

	  if (!fs.existsSync(dir)) return res.status(401).send('Not Authorized');

	  var file = 'softeng20bAPI'

	  var path = dir + '/' +  file

		const data = fs.readFileSync(path, {encoding:'utf8', flag:'r'})

		if(data != user_logout_token) {
			return res.status(401).send('Not Authorized')
		}

		try {
  		fs.writeFileSync(path, '')
				} catch(err) {
  			console.error(err)
				}

		res.sendStatus(200)
	}
}

module.exports = logout;
