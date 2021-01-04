module.exports = (app) => {
    const getSessionsPerPoint = require('../controllers/SessionsPerPointController')
    
app.get('/evcharge/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_til',getSessionsPerPoint)
}