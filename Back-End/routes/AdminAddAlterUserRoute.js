module.exports = (app) => {
    const Add_Alter_User = require('../controllers/AdminAddAlterUserController')
    const verifyToken = require('../controllers/VerifyTokenController')

app.post('/evcharge/api/admin/usermod/:username/:password', verifyToken, Add_Alter_User)
}
