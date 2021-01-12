const jwt = require('jsonwebtoken')
var secretToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDk5Njk2NjEsImV4cCI6MTY0MTUwNTY2MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.X0AKkr4AXvRRgg0C9_yjvhOV7najxgQN4xbS57Y7GGQ"
 
function verifyToken(req, res, next) {
    
    const token  = req.headers['x-observatory-auth'];
    
    if (!token)  res.status(401).send('Not Authorized')
    else{
        jwt.verify(token, secretToken, (err, user) => {
            if (err) res.status(401).send('Not Authorized')
            else {req.user = user
            next()
            }
        })
    }
  }
/*
  function verifyToken(req, res, next) {
     
    const token  = req.headers['x-observatory-auth'];
    if (!token)  res.status(401).send('Missing Token')
        jwt.verify(token, secretToken, (err, user) => {
            if (err) return res.status(401).send('Lack of Authentication')
            req.user = user
            next()
            
        })
    
  }
*/
module.exports = verifyToken