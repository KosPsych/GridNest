const db = require('../db')


function getSessionsPerEV(req, res) {

    // first query
    getSessions = "SELECT a.VehicleID,a.NumberOfChargingSessions ,a.TotalEnergyConsumed , b.NumberOfVisitedPoints\n"+
    "FROM \n"+
    "(SELECT s.VehicleID,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyConsumed\n"+
    "FROM sessions s\n"+
    `WHERE s.VehicleID  = ${req.params.vehicleID} AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}') as a\n`+
    "JOIN\n"+ 
    "(SELECT a.VehicleID,Count(*) as NumberOfVisitedPoints\n"+
    "FROM\n"+ 
    "(SELECT DISTINCT s.VehicleID,s.PointID\n"+
    "FROM sessions s\n"+
    `WHERE s.VehicleID  = ${req.params.vehicleID} AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' ) as a ) as b \n`+
    "on a.VehicleID = b.VehicleID;\n"+
    // second query
    "SELECT s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , st.CostPerKwh , ROUND(s.KwhDelivered * st.CostPerKwh,2) as SessionCost\n"+
    "FROM sessions s\n"+
    "JOIN stations st on s.StationID = st.StationID\n"+
    `WHERE s.VehicleID  = ${req.params.vehicleID} AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}'\n`+
    "ORDER BY s.doneCharginTime,s.connectionTime;"
    
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

module.exports = getSessionsPerEV;