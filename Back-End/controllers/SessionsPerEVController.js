const db = require('../db')

const {arrayToCSV , convert_datetime , convert_date} = require('./HelpfulFunctions')



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

            if(err) res.status(400).send("Incorrect Data Format.Please insert the correct format for each field") 

            else if (rows=='') res.status(402).send("No Data")
            else {
                //if (rows)
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
        

        db.query(getSessions,[1,2,3], (err, rows) => {

            if(err) res.status(400).send("Incorrect Data Format.Please insert the correct format for each field") 
            else if (rows[0].length < 1 || rows[1].length < 1) res.status(402).send("No Data")
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