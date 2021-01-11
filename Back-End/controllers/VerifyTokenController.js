const jwt = require('jsonwebtoken')
var fs = require('fs');

var secretToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDk5Njk2NjEsImV4cCI6MTY0MTUwNTY2MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.X0AKkr4AXvRRgg0C9_yjvhOV7najxgQN4xbS57Y7GGQ"

function verifyToken(req, res, next) {

    const token  = req.headers['x-observatory-auth']
    if (!token)  res.status(401).send('Not Authorized')
    else{
        var dir = './Tokens'

        if (!fs.existsSync(dir)) return res.status(401).send('Not Authorized');

        var file = 'softeng20bAPI'

        var path = dir + '/' +  file

        const data = fs.readFileSync(path, {encoding:'utf8', flag:'r'})

        if (data != token) return res.status(401).send('Not Authorized');

        jwt.verify(token, secretToken, (err, user) => {
            if (err) res.status(401).send('Not Authorized')
            else {req.user = user
            next()
            }
        })
    }
  }

module.exports = verifyToken
