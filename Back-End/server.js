const app = require('./app')
const https = require('https');
const fs = require('fs');

const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

//connect to the database
require('./db')

const port = 8765;

app.get('/', (req, res) => {
   res.send('Now using https..');
});

var server = https.createServer(credentials, app);

// listen for requests
server.listen(port, () => {
  console.log("server starting on port : " + port)
});
