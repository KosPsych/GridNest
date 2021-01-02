const express = require('express')
const bodyParser = require('body-parser')

// create express app
const app = express()


require('./routes/SessionsPerPointRoute')(app)
require('./routes/SessionsPerStationRoute')(app)
require('./routes/SessionsPerEVRoute')(app)

module.exports = app