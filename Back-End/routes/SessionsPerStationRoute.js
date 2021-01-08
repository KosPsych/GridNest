module.exports = (app) => {
    const getSessionsPerStation = require('../controllers/SessionsPerStationController')
    const verifyToken = require('../controllers/VerifyTokenController')

app.get('/evcharge/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_til',verifyToken,getSessionsPerStation)
}