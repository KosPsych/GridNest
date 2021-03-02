const app = require('./app')
const https = require('https');
const fs = require('fs');
const dbase = require('./db');
const config = require('config');


const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

//connect to the database

dbase.connect(err => {
  if (err) throw err;
  else console.log(`Successfully connected to database : ${config.get('database.database')}`)
})


dbase.query("SET GLOBAL max_allowed_packet=1073741824;", function (err, result) {
      if (err) throw err;
  });

const port = 8765;


app.get('/', (req, res) => {
   res.send('Now using https..');
});

var server = https.createServer(credentials, app);

// listen for requests
server.listen(port, () => {
  console.log("server starting on port : " + port)
});
