const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


// create express app
const app = express()



// support json encoded bodies
app.use(bodyParser.json()) 
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cors({origin: 'http://localhost:3000'}));

require('./routes/LoginRoute')(app)
require('./routes/LogoutRoute')(app)
require('./routes/AdminAddAlterUserRoute')(app)
require('./routes/AdminReadUserRoute')(app)
require('./routes/ResetRoute')(app)
require('./routes/HealthCheckRoute')(app)
require('./routes/SessionsPerPointRoute')(app)
require('./routes/SessionsPerStationRoute')(app)
require('./routes/SessionsPerEVRoute')(app)
require('./routes/SessionsPerProviderRoute')(app)
require('./routes/AdminAddSessionsRoute')(app)


module.exports = app
