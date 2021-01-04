module.exports = (app) => {
    const getSessionsPerStation = require('../controllers/SessionsPerStationController')

app.get('/evcharge/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_til',getSessionsPerStation)
}