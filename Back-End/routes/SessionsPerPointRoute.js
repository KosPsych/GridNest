module.exports = (app) => {
    const getSessionsPerPoint = require('../controllers/SessionsPerPointController')
    const verifyToken = require('../controllers/VerifyTokenController')

app.get('/evcharge/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_til',verifyToken,getSessionsPerPoint)
}