const db = require('../db')

function resetsessions(req, res) {
  let reset_query = 'DELETE FROM Sessions; INSERT INTO users (Username, Password, isAdmin) VALUES ("admin", "petrol4ever", "1")';
  db.query(reset_query, (err, result) => {
    if(err) res.json({ "status": "failed" })
    else res.json({ "status": "OK" })
  })
}

module.exports = resetsessions;
