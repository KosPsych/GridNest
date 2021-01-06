const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// create express app
const app = express()

app.use(cors({origin: 'http://localhost:3000'})); 

require('./routes/SessionsPerPointRoute')(app)
require('./routes/SessionsPerStationRoute')(app)
require('./routes/SessionsPerEVRoute')(app)

module.exports = app