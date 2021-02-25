const fs = require("fs");
const fastcsv = require("fast-csv");
const db = require('../db');

function AddSessions(req,res){

    let stream = fs.createReadStream("./upload_folder/upload_file.csv");
    let csvData = [];
    
    let csvStream = fastcsv
        .parse()
        .on("data", function(data) {
        csvData.push(data);
        })
        .on("end", function() {
            // remove the first line: header
            csvData.shift();
    
            let insert_query = "INSERT IGNORE  INTO Sessions(SessionID, StationID,PointID, Username, VehicleID, connectionTime,"+
            " doneCharginTime, Timezone ,KwhDelivered ,Protocol,Payment )  VALUES ?";
            db.query(insert_query, [csvData], (err, db_res) => {
                if (err) res.send("Incorrect Data format for  Sessions or File is too big(larger than 1GB)")
                else{
                    let count_query = "SELECT Count(*) as count FROM Sessions";
                    db.query(count_query, (err1, result) => {
                        if (err1) res.send(err1.message)
                        else {
                            res.send({SessionsInUploadedFile :db_res.affectedRows +  db_res.warningCount , SessionsImported : db_res.affectedRows, TotalSessionsInDatabase :result[0].count});


                        }
                    })
                }
            });

        }
        );

    stream.pipe(csvStream);
}
module.exports = AddSessions