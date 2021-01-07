module.exports = (app) => {
    const HealthCheck = require('../controllers/HealthCheckController')

app.get('/evcharge/api/admin/healthcheck', HealthCheck)
}
