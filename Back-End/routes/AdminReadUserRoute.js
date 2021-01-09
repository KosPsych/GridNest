module.exports = (app) => {
      const Read_User = require('../controllers/AdminReadUserController')
      const verifyToken = require('../controllers/VerifyTokenController')

app.get('/evcharge/api/admin/users/:username', verifyToken, Read_User)
}
