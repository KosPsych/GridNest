const db = require('../db')

function HealthCheck(req, res) {
	
	if(db.state === 'disconnected'){
		res.json({ "status": "failed" })
	}
	else {
		res.json({ "status": "OK" })
	}
}

module.exports = HealthCheck
