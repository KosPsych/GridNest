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
    return date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2)
}

function getSessionsPerPoint(req, res) {
    if (req.query.format == 'csv') {
        getSessions = "SELECT c.PointID,c.PointOperator,c.NumberOfChargingSessions , d.SessionID,d.StartedOn,d.FinishedOn ,d.Protocol ,d.EnergyDelivered , d.Payment , d.VehicleType\n"+
        "FROM\n"+
        "(SELECT p.PointID,p.PointOperator,Count(*) as NumberOfChargingSessions\n"+
        "FROM sessions s\n"+
        "JOIN points p on p.PointID = s.PointID\n"+
        `WHERE p.PointID  = '${req.params.pointID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}') as c\n`+
        "JOIN\n"+
        "(SELECT s.PointID ,s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , s.Payment , v.type as VehicleType\n"+
        "FROM sessions s\n"+
        "JOIN vehicles v  on v.VehicleID = s.VehicleID\n"+
        `WHERE s.PointID  = '${req.params.pointID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}') as d\n`+
        "on d.PointID = c.PointID\n"+
        "ORDER BY d.StartedOn,d.FinishedOn;"

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
                result["ChargingSessionsList"] = rows[1];
                res.send(result);
                   
            }
        })
        
    }
}

module.exports = getSessionsPerPoint;