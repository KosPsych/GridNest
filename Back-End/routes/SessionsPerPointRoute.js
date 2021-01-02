module.exports = (app) => {
    const getSessionsPerPoint = require('../controllers/SessionsPerPointController')
    
app.get('/api/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_til',getSessionsPerPoint)
}