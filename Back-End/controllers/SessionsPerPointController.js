const db = require('../db')


function getSessionsPerPoint(req, res) {
    // first query
    getSessions = "SELECT p.PointID,p.PointOperator,Count(*) as NumberOfChargingSessions\n"+
    "FROM sessions s\n"+
    "JOIN points p on p.PointID = s.PointID\n"+
    `WHERE s.PointID  = '${req.params.pointID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}';`+
    // second query
    "SELECT s.SessionID,s.connectionTime as 'StartedOn',s.doneCharginTime as 'FinishedOn',s.Protocol ,s.KwhDelivered as EnergyDelivered , s.Payment , v.type as VehicleType\n"+
    "FROM sessions s\n"+
    "JOIN vehicles v  on v.VehicleID = s.VehicleID\n"+
    `WHERE s.PointID  = '${req.params.pointID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}'`+
    'ORDER BY s.doneCharginTime,s.connectionTime;'

    
    //getSessions = "SELECT * from Sessions";
    db.query(getSessions,[1,2], (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            rows[0][0]["PeriodFrom"] =req.params.yyyymmdd_from;
            rows[0][0]["PeriodΤο"] = req.params.yyyymmdd_til;

            let date_ob = new Date();
            // current date
            // adjust 0 before single digit date
            let date = ("0" + date_ob.getDate()).slice(-2);
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            // current year
            let year = date_ob.getFullYear();
            // current hours
            let hours = date_ob.getHours();
            // current minutes
            let minutes = date_ob.getMinutes();
            // current seconds
            let seconds = date_ob.getSeconds();

            rows[0][0]["RequestTimestamp"] = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            res.send(rows)    
        }
        })

}

module.exports = getSessionsPerPoint;