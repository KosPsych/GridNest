const db = require('../db')

function AdminReadUser(req,res){

  if(req.user.isAdmin!='1') res.status(401).send('Lack of Authorization')
  else{
    const username = req.params.username;
    let users_info = 'SELECT * FROM Users WHERE Username='.concat("'", username, "';");

    db.query(users_info, (err, result) => {
        if(err) throw 'query failed';
        else if (result=='') throw 'No such user';
        else res.send(result);
    })
  }
}

module.exports = AdminReadUser;
