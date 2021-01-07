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

function getSessionsPerProvider(req, res) {
    if (req.query.format == 'csv') {
        getSessions = "SELECT a.ProviderID , a.ProviderName , b.StationID,b.SessionID,b.VehicleID,b.StartedOn,b.FinishedOn,b.EnergyDelivered , b.CostPerKwh , b.TotalCost \n"+
        "FROM\n"+
        "(SELECT e.EPID as ProviderID,e.Name as ProviderName \n"+
        "FROM energyproviders e\n"+
        `WHERE e.EPID = ${req.params.providerID} ) as a\n`+
        "JOIN\n"+
        "(SELECT e.EPID,s.StationID,s.SessionID,s.VehicleID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.KwhDelivered as EnergyDelivered , st.CostPerKwh , ROUND(s.KwhDelivered * st.CostPerKwh,2) as TotalCost \n"+
        "FROM sessions s \n"+
        "JOIN stations st on s.StationID = st.StationID\n"+
        "JOIN energyproviders e on e.EPID = st.EnergyProvidersID\n"+
        `WHERE e.EPID = ${req.params.providerID}  and s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <= '${req.params.yyyymmdd_til}') as b\n`+
        "on b.EPID = a.ProviderID\n"+
        "ORDER BY b.StartedOn,b.FinishedOn";

        db.query(getSessions, (err, rows) => {
            if(err) res.status(400).send(err.message) 
            else {

                rows.forEach( row => row["StartedOn"] =convert_datetime(row["StartedOn"]));
                rows.forEach( row => row["FinishedOn"] = convert_datetime(row["FinishedOn"]));                

                result = arrayToCSV(rows);
                res.send(result);
                        
            }
        })

    }
    else{
        // first query
        getSessions = "SELECT e.EPID as ProviderID,e.Name as ProviderName\n"+ 
        "FROM energyproviders e\n"+
        `WHERE e.EPID = ${req.params.providerID} ;\n`+
        // second query
        "SELECT s.StationID,s.SessionID,s.VehicleID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.KwhDelivered as EnergyDelivered , st.CostPerKwh , ROUND(s.KwhDelivered * st.CostPerKwh,2) as TotalCost \n"+
        "FROM sessions s\n"+ 
        "JOIN stations st on s.StationID = st.StationID\n"+
        "JOIN energyproviders e on e.EPID = st.EnergyProvidersID\n"+
        `WHERE e.EPID =  ${req.params.providerID} and s.connectionTime >= '${req.params.yyyymmdd_from}' AND s.doneCharginTime <=  '${req.params.yyyymmdd_til}'\n`;
        "ORDER BY StartedOn,FinishedOn;"
        
        db.query(getSessions,[1,2], (err, rows) => {
            if(err) res.status(400).send(err.message) 
            else {
                // Add request parameters and convert date and datetime to desired endpoint values
               // res.send(rows);
                
                rows[1].forEach( row => row["StartedOn"] =convert_datetime(row["StartedOn"]));
                rows[1].forEach( row => row["FinishedOn"] = convert_datetime(row["FinishedOn"]));                
                


                // return the desired json object 
                result = rows[0][0];
                result["ProviderChargingSessionsList"] = rows[1];
                res.send(result);
                
                   
            }
        })
        
    }
}

module.exports = getSessionsPerProvider;