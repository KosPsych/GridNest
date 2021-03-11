const db = require('../db')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    const Login = require('../controllers/LoginController')

app.post('/evcharge/api/login', authorization, Login)
}

async function authorization(req, res, next){

      const name = "SELECT * FROM Users\n"+
      `WHERE Username = '${req.body.username}';`

      db.query(name,(err, result) => {
          if(err) throw 'query failed';
          else if (result==''){
            res.status(400).send('Username is Incorrect')
          }
          else {
              bcrypt.compare(req.body.password, result[0]['Password'], function(error, res) {
                if(error) throw 'Cant compare passwords';
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
