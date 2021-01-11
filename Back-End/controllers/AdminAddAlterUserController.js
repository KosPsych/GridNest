const db = require('../db')
const bcrypt = require('bcrypt')

function AdminAddAlterUser(req,res){

  if(req.user.isAdmin!='1' && req.user.isAdmin!='2') res.status(401).send('Lack of Authorization')
  else{
      const username = req.params.username
      const password = req.params.password
      const first_name = req.body.first_name
      const last_name = req.body.last_name
      const email = req.body.email
      var isAdmin = req.body.isAdmin

      if(isAdmin == 2 || username != 'admin') isAdmin = 1 //if admin made mistake, make user simply admin not default admin
      if(username == 'admin') isAdmin  =  2 //if username = 'admin' then we insert default admin

      bcrypt.hash(password, 10, (err, hashpass) => {
        if(err) {
          throw 'Hashing Failed'
        }

        let check_existence =  'SELECT * FROM Users WHERE Username='.concat("'",  username, "';");

        db.query(check_existence,(error, result) => {
            if(error) throw 'query failed';

            else if (result==''){
              //IF USER DOESN'T EXISTS
              console.log("No such user. Adding")

              let user_query = 'INSERT INTO Users (FirstName, LastName, email, isAdmin, Username, Password) VALUES ('.concat("'", first_name, "', ","'", last_name, "', ", "'", email, "', ", "'", isAdmin, "', ", "'", username, "', ", "'", hashpass, "');" );

              db.query(user_query, (error1, result1) => {
                if(error1) throw 'query failed';
                else res.send(result1)
              })
            }
            else {
              //IF USER ALREADY EXISTS
              console.log("Already exists such user. Changing Password")

              let change_user_pass = 'UPDATE Users SET '.concat("Password='", hashpass, "' WHERE Username='", username, "';");
              db.query(change_user_pass, (error2, result2) => {
                if(error2) throw 'query failed';
                else res.send(result2)
              })
            }
          })


        })
      }
  }

module.exports = AdminAddAlterUser;
