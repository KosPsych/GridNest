const db = require('../db')

function arrayToCSV (data) {
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join('\n');
  }
function convert_datetime(date_ob){
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);
    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}
function convert_date(date){
return date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
    
}

function getSessionsPerEV(req, res) {
    if (req.query.format == 'csv') {
        getSessions ="SELECT c.VehicleID,c.NumberOfChargingSessions ,c.TotalEnergyConsumed , c.NumberOfVisitedPoints , d.SessionID,d.StartedOn, d.FinishedOn,d.Protocol ,d.EnergyDelivered , d.CostPerKwh ,d.SessionCost\n"+ 
        "FROM\n"+
        "(SELECT a.VehicleID,a.NumberOfChargingSessions ,a.TotalEnergyConsumed , b.NumberOfVisitedPoints\n"+
        "FROM \n"+
        "(SELECT s.VehicleID,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyConsumed\n"+
        "FROM sessions s\n"+
        `WHERE s.VehicleID  = ${req.params.vehicleID} AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}') as a\n`+
        "JOIN \n"+
        "(SELECT a.VehicleID,Count(*) as NumberOfVisitedPoints\n"+
        "FROM \n"+
        "(SELECT DISTINCT s.VehicleID,s.PointID\n"+
        "FROM sessions s\n"+
        `WHERE s.VehicleID  = ${req.params.vehicleID} AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' ) as a ) as b \n`+
        "on a.VehicleID = b.VehicleID) as c\n"+
        "JOIN \n"+
        "(SELECT s.VehicleID,s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , st.CostPerKwh , ROUND(s.KwhDelivered * st.CostPerKwh,2) as SessionCost \n"+
        "FROM sessions s\n"+
        "JOIN stations st on s.StationID = st.StationID\n"+
        `WHERE s.VehicleID  = ${req.params.vehicleID} AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}') as d\n`+
        "on c.VehicleID = d.VehicleID\n"+
        "ORDER BY d.StartedOn,d.FinishedOn;\n"
    
        db.query(getSessions, (err, rows) => {
            if(err) res.status(400).send(err.message) 
            else {
                rows.forEach( row => row["PeriodFrom"] = convert_date(req.params.yyyymmdd_from));
                rows.forEach( row => row["PeriodTo"] = convert_date(req.params.yyyymmdd_til));
                rows.forEach( row => row["StartedOn"] =convert_datetime(row["StartedOn"]));
                rows.forEach( row => row["FinishedOn"] = convert_datetime(row["FinishedOn"]));                


                let date_ob = new Date();

                rows.forEach( row => row["RequestTimestamp"] = convert_datetime(date_ob));

                result = arrayToCSV(rows);
                res.send(result);
                        
            }
        })
    }
    else{
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
                    // Add request parameters and convert date and datetime to desired endpoint values
                    rows[0][0]["PeriodFrom"] =convert_date(req.params.yyyymmdd_from);
                    rows[0][0]["PeriodΤο"] = convert_date(req.params.yyyymmdd_til);
                    rows[1].forEach( row => row["StartedOn"] =convert_datetime(row["StartedOn"]));
                    rows[1].forEach( row => row["FinishedOn"] = convert_datetime(row["FinishedOn"]));
                    let date_ob = new Date();
                    rows[0][0]["RequestTimestamp"] = convert_datetime(date_ob);
                    
                    // add SessionIndex field
                    //for (let i = start; i <= length(rows[1]); i++) 

                    // return the desired json object 
                    result = rows[0][0];
                    result["VehicleChargingSessionsList"] = rows[1];
                    res.send(result);
            }
        })
    }

}

module.exports = getSessionsPerEV;