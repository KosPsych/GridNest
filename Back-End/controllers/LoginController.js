const db = require('../db')
const jwt = require('jsonwebtoken')
var fs = require('fs');

const secretToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDk5Njk2NjEsImV4cCI6MTY0MTUwNTY2MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.X0AKkr4AXvRRgg0C9_yjvhOV7najxgQN4xbS57Y7GGQ"

function login(req, res) {

        if (!req.user){
          return res.status(400).send('Username or Password are Incorrect')
        }
        var user_access_token = user_access_token_generation(req.user)

        res.json({ user_access_token: user_access_token })

        }

function user_access_token_generation(user){

  var user_access_token = jwt.sign(user, secretToken)

  var dir = './Tokens'

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  var file = 'softeng20bAPI'

  var path = dir + '/' +  file

  fs.writeFileSync(path, user_access_token)
  console.log("Token saved successfully\n");

  return user_access_token;
}
module.exports = login;
