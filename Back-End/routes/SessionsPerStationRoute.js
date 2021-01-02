module.exports = (app) => {
    const getSessionsPerStation = require('../controllers/SessionsPerStationController')

app.get('/api/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_til',getSessionsPerStation)
}