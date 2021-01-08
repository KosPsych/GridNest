module.exports = (app) => {
    const getSessionsPerProvider = require('../controllers/SessionsPerProviderController')
    const verifyToken = require('../controllers/VerifyTokenController')
    
app.get('/evcharge/api/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_til',verifyToken,getSessionsPerProvider)
}