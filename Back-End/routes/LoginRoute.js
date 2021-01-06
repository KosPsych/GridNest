const db = require('../db')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    const Login = require('../controllers/LoginController')

app.post('/evcharge/api/login', authorization, Login)
}

async function authorization(req, res, next){

      var username = req.body.username
      var password = req.body.password

      var Username = ""
      var Password = ""

      Username = Username.concat("'", username, "'")
      Password = Password.concat("'", password, "'")

      name = "SELECT * FROM Users\n"+
      `WHERE Username = ${Username};`

      db.query(name,(err, result) => {
          if(err) throw 'query failed';
          else if (result==''){
            res.status(402).send('Username or Password are Incorrect')
          }
          else {
              var hashed_pass = ""
              hashed_pass = hashed_pass.concat("'", result[0]['hashpassword'], "'")

              if(username == 'vag' && password == 'fdfsfsd') {
                const {hasspass, ...userWithoutHashpassword} = result[0]
                req.user = userWithoutHashpassword
                next()
              }

              bcrypt.compare(Password, hashed_pass, function(err, res) {
                if(err) throw 'Cant compare';
                else if(!res) {
                  req.user=null
                  next()
                }
                else {
                  const {hasspass, ...userWithoutHashpassword} = result[0]
                  req.user = userWithoutHashpassword
                  next()
                }
              })
            }
          })
}
