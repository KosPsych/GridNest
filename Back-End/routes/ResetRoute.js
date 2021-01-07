module.exports = (app) => {
    const Reset = require('../controllers/ResetController')

app.post('/evcharge/api/admin/resetsessions', Reset)
}
