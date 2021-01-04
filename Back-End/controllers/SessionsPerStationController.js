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

function getSessionsPerStation(req, res) {

    if (req.query.format == 'csv') {
        getSessions = "SELECT c.StationID,c.Operator,c.NumberOfChargingSessions ,c.TotalEnergyDelivered , c.NumberOfActivePoints ,d.PointID ,d.PointSessions, d.EnergyDelivered\n"+ 
        "FROM\n"+
        "(SELECT a.StationID,a.Operator,a.NumberOfChargingSessions ,a.TotalEnergyDelivered , b.NumberOfActivePoints\n"+
        "FROM\n"+ 
        "(SELECT st.StationID,st.Operator,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyDelivered\n"+ 
        "FROM sessions s\n"+
        "JOIN stations st on st.StationID = s.StationID\n"+
        `WHERE '${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' ) as a\n`+
        "JOIN \n"+
        "(SELECT a.StationID,Count(*) as NumberOfActivePoints\n"+
        "FROM \n"+
        "(SELECT DISTINCT st.StationID,s.PointID\n"+
        "FROM sessions s\n"+
        "JOIN stations st on st.StationID = s.StationID\n"+
        `WHERE '${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}'  ) as a ) as b \n`+
        "on a.StationID = b.StationID ) as c\n"+
        "JOIN\n"+
        "(SELECT s.stationID,s.PointID , Count(*) as PointSessions, SUM(s.KwhDelivered) as EnergyDelivered \n"+
        "FROM sessions s\n"+
        `WHERE '${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' \n`+
        "GROUP BY s.PointID ) as d\n"+
        "on c.stationID = d.stationID;"
        
        db.query(getSessions, (err, rows) => {
            if(err) res.status(400).send(err.message) 
            else {
                rows.forEach( row => row["PeriodFrom"] = convert_date(req.params.yyyymmdd_from));
                rows.forEach( row => row["PeriodTo"] = convert_date(req.params.yyyymmdd_til));          

                let date_ob = new Date();
                rows.forEach( row => row["RequestTimestamp"] = convert_datetime(date_ob));

                result = arrayToCSV(rows);
                res.send(result);
                        
            }
        })    
    }
    else {
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
                // Add request parameters and convert date  to desired endpoint values
                rows[0][0]["PeriodFrom"] =convert_date(req.params.yyyymmdd_from);
                rows[0][0]["PeriodΤο"] = convert_date(req.params.yyyymmdd_til);
                let date_ob = new Date();
                rows[0][0]["RequestTimestamp"] = convert_datetime(date_ob);
                
                // add SessionIndex field
                //for (let i = start; i <= length(rows[1]); i++) 

                // return the desired json object 
                result = rows[0][0];
                result["SessionsSummaryList"] = rows[1];
                res.send(result);

                
            }
        })
    }
}

module.exports = getSessionsPerStation;