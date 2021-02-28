module.exports = (app) => {
    const Reset = require('../controllers/ResetController')
    const verifyToken = require('../controllers/VerifyTokenController')

app.post('/evcharge/api/admin/resetsessions', verifyToken, Reset)
}
