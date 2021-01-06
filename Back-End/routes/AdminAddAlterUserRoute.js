const jwt = require('jsonwebtoken')

var secretToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDk5Njk2NjEsImV4cCI6MTY0MTUwNTY2MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.X0AKkr4AXvRRgg0C9_yjvhOV7najxgQN4xbS57Y7GGQ"

module.exports = (app) => {
    const Add_Alter_User = require('../controllers/AdminAddAlterUserController')

app.post('/evcharge/api/admin/usermod/:username/:password', verifyToken, Add_Alter_User)
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['x-observatory-auth']
  const token = authHeader
  if (!token) return res.status(401).send('Missing Token')

      jwt.verify(token, secretToken, (err, user) => {
          if (err) return res.sendStatus(403).send('Access Token is no Longer Valid')
          req.user = user
          next()
      })
}
