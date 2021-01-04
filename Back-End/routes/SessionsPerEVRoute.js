module.exports = (app) => {
    const getSessionsPerEV = require('../controllers/SessionsPerEVController')
    
app.get('/evcharge/api/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_til',getSessionsPerEV)
}