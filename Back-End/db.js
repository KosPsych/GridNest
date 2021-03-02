let mysql = require('mysql');
let config = require('config');
let dbase = mysql.createConnection(config.get('database'));
module.exports = dbase;