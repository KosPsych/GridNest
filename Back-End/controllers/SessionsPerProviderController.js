const db = require('../db')

const {arrayToCSV , convert_datetime , convert_date} = require('./HelpfulFunctions')

function getSessionsPerProvider(req, res) {

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
    
        if(err) res.status(400).send("Incorrect Data Format.Please insert the correct format for each field") 
        else if (rows=='') res.status(402).send("No Data")

        else {

            rows.forEach( row => row["StartedOn"] =convert_datetime(row["StartedOn"]));
            rows.forEach( row => row["FinishedOn"] = convert_datetime(row["FinishedOn"]));                
            if(req.query.format == 'csv') 
                rows = arrayToCSV(rows);
            res.send(rows);
                    
        }
    })

}

module.exports = getSessionsPerProvider;