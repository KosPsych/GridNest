const db = require('../db')
const bcrypt = require('bcrypt');

function resetsessions(req, res) {
  var username = 'admin'
  var password = 'petrol4ever'
  var isAdmin = '1'
  password = bcrypt.hashSync(password, 10);

  let reset_query = 'DELETE FROM Sessions; INSERT INTO users (Username, Password, isAdmin) VALUES (?, ?, ?)';
  db.query(reset_query, [username, password, isAdmin],(err, result) => {
    if(err) res.json({ "status": "failed" })
    else res.json({ "status": "OK" })
  })
}

module.exports = resetsessions;
