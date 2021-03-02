const db = require('../db')
const bcrypt = require('bcrypt');

function resetsessions(req, res) {

  if(req.user.isAdmin!='1' && req.user.isAdmin!='2') res.status(401).send('Lack of Authorization')
  else {
    var username = 'admin'
    var password = 'petrol4ever'
    var isAdmin = '2'
    password = bcrypt.hashSync(password, 10);

    let check_def_admin_existence =  "SELECT * FROM Users WHERE isAdmin='2'";
    db.query(check_def_admin_existence, (error,  result1) => {
      if(error) throw 'query failed';
      else if(result1=='') {
        let reset_query = 'DELETE FROM Sessions; INSERT INTO users (Username, Password, isAdmin) VALUES (?, ?, ?)';
        db.query(reset_query, [username, password, isAdmin],(err, result) => {
          if(err) res.json({ "status": "failed" })
          else res.json({ "status": "OK" })
        })
      }
      else  {
        reset_def_admin = 'DELETE FROM Sessions; UPDATE Users SET Username = ?, Password = ? WHERE isAdmin = ?'
        db.query(reset_def_admin, [username,password, isAdmin], (error1, result2)  =>  {
          if(error1) res.json({ "status": "failed" })
          else res.json({ "status": "OK" })
        })
      }
    })
  }
}

module.exports = resetsessions;
