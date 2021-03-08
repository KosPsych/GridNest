module.exports = (app) => {
    const getSessionsPerEV = require('../controllers/SessionsPerEVController')
    const verifyToken = require('../controllers/VerifyTokenController')

app.get('/evcharge/api/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_til', verifyToken, getSessionsPerEV)
}
