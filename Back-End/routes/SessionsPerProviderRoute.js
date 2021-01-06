module.exports = (app) => {
    const getSessionsPerProvider = require('../controllers/SessionsPerProviderController')
    
app.get('/evcharge/api/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_til',getSessionsPerProvider)
}