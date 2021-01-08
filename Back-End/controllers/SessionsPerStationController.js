const db = require('../db')

const {arrayToCSV , convert_datetime , convert_date} = require('./HelpfulFunctions')

function getSessionsPerStation(req, res) {

    if (req.query.format == 'csv') {
        getSessions = "SELECT c.StationID,c.Operator,c.NumberOfChargingSessions ,c.TotalEnergyDelivered , c.NumberOfActivePoints ,d.PointID ,d.PointSessions, d.EnergyDelivered\n"+ 
        "FROM\n"+
        "(SELECT a.StationID,a.Operator,a.NumberOfChargingSessions ,a.TotalEnergyDelivered , b.NumberOfActivePoints\n"+
        "FROM\n"+ 
        "(SELECT st.StationID,st.Operator,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyDelivered\n"+ 
        "FROM sessions s\n"+
        "JOIN stations st on st.StationID = s.StationID\n"+
        `WHERE st.stationID  ='${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' ) as a\n`+
        "JOIN \n"+
        "(SELECT a.StationID,Count(*) as NumberOfActivePoints\n"+
        "FROM \n"+
        "(SELECT DISTINCT st.StationID,s.PointID\n"+
        "FROM sessions s\n"+
        "JOIN stations st on st.StationID = s.StationID\n"+
        `WHERE st.stationID  ='${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}'  ) as a ) as b \n`+
        "on a.StationID = b.StationID ) as c\n"+
        "JOIN\n"+
        "(SELECT s.stationID,s.PointID , Count(*) as PointSessions, SUM(s.KwhDelivered) as EnergyDelivered \n"+
        "FROM sessions s\n"+
        `WHERE s.stationID  ='${req.params.stationID}' AND s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}' \n`+
        "GROUP BY s.PointID ) as d\n"+
        "on c.stationID = d.stationID;"
        
        db.query(getSessions, (err, rows) => {

            if(err) res.status(400).send(err.message) 

            else if (rows=='') res.status(402).send("No Data")

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

            else if (rows[0].length < 1 || rows[1].length < 1) res.status(402).send("No Data")

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