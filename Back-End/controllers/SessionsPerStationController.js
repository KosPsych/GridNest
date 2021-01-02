const db = require('../db')


function getSessionsPerStation(req, res) {
    // first query

    getSessions = "SELECT a.StationID,a.Operator,a.NumberOfChargingSessions ,a.TotalEnergyDelivered , b.NumberOfActivePoints\n"+
    "FROM\n"+
    "(SELECT st.StationID,st.Operator,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyDelivered\n"+
    "FROM sessions s\n"+
    "JOIN stations st on st.StationID = s.StationID\n"+
    `WHERE st.stationID  = '${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' ) as a\n`+
    "JOIN\n"+
    "(SELECT a.StationID,Count(*) as NumberOfActivePoints\n"+
    "FROM\n"+ 
    "(SELECT DISTINCT st.StationID,s.PointID\n"+
    "FROM sessions s\n"+
    "JOIN stations st on st.StationID = s.StationID\n"+
    `WHERE st.stationID  = '${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' ) as a ) as b \n`+
    "on a.StationID = b.StationID;\n"+
    // second query
    "SELECT s.PointID , Count(*) as PointSessions, SUM(s.KwhDelivered) as EnergyDelivered\n"+
    "FROM sessions s\n"+
    `WHERE s.stationID  = '${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}'\n`+
    "GROUP BY s.PointID;"
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

module.exports = getSessionsPerStation;