module.exports = (app) => {
    const Logout = require('../controllers/LogoutController')

app.post('/evcharge/api/logout',Logout)
}
