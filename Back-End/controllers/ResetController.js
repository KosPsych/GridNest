const db = require('../db')
const bcrypt = require('bcrypt');

function resetsessions(req, res) {
  var username = 'admin'
  var password = 'petrol4ever'
  var isAdmin = '2'
  password = bcrypt.hashSync(password, 10);

  let check_def_admin_existence =  "SELECT * FROM Users WHERE Username='admin'";
  db.query(check_def_admin_existence, (error,  result1) => {
    if(error) throw 'query failed';
    else if(result1=='') {
      console.log('Admin not in database. Adding...')
      let reset_query = 'DELETE FROM Sessions; INSERT INTO users (Username, Password, isAdmin) VALUES (?, ?, ?)';
      db.query(reset_query, [username, password, isAdmin],(err, result) => {
        if(err) res.json({ "status": "failed" })
        else res.json({ "status": "OK" })
      })
    }
    else  {
      console.log('Admin already in database. Changing password')
      let reset_def_admin = 'DELETE FROM Sessions; UPDATE Users SET Password = ? WHERE Username=?';
      db.query(reset_def_admin, [password, username], (error1, result2)  =>  {
        if(error1) res.json({ "status": "failed" })
        else res.json({ "status": "OK" })
      })
    }
  })

}

module.exports = resetsessions;
