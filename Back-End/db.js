let mysql = require('mysql');

let dbase = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "softeng2020",
    database: "GridNest",
    multipleStatements: true
});


dbase.connect(err => {
    if (err) throw err;
    else console.log("Successfully connected to the database.")
})

/*
dbase.query("SELECT * from Sessions", function (err, result) {
        if (err) throw err;
        else{
            console.log("Success")
            dbase.end();
            return;
        }

    });
*/

module.exports = dbase;