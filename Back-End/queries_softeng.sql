USE gridnest;

############################################### SessionsPerPoint  ##############################################
################################################## JSON ############################################## 
SELECT p.PointID,p.PointOperator,Count(*) as NumberOfChargingSessions
FROM sessions s
JOIN points p on p.PointID = s.PointID
WHERE p.PointID  = "1-1-178-817" AND s.connectionTime >= "20181009" AND s.doneCharginTime <= "20181016";

SELECT s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , s.Payment , v.type as VehicleType
FROM sessions s
JOIN vehicles v  on v.VehicleID = s.VehicleID
WHERE s.PointID  = "1-1-178-817" AND s.connectionTime >= "20181009" AND s.doneCharginTime <= "20181016"
ORDER BY s.doneCharginTime,s.connectionTime;



############################################### CSV  ##############################################
SELECT c.PointID,c.PointOperator,c.NumberOfChargingSessions , d.SessionID,d.StartedOn,d.FinishedOn ,d.Protocol ,d.EnergyDelivered , d.Payment , d.VehicleType
FROM
(SELECT p.PointID,p.PointOperator,Count(*) as NumberOfChargingSessions
FROM sessions s
JOIN points p on p.PointID = s.PointID
WHERE p.PointID  = "1-1-178-817" AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09") as c
JOIN
(SELECT s.PointID ,s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , s.Payment , v.type as VehicleType
FROM sessions s
JOIN vehicles v  on v.VehicleID = s.VehicleID
WHERE s.PointID  = "1-1-178-817" AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2019-10-16 18:13:09") as d
on d.PointID = c.PointID
ORDER BY d.StartedOn,d.FinishedOn;


############################################## SessionsPerStation ######################################################
################################################## JSON ############################################## 
SELECT a.StationID,a.Operator,a.NumberOfChargingSessions ,a.TotalEnergyDelivered , b.NumberOfActivePoints
FROM 
(SELECT st.StationID,st.Operator,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyDelivered 
FROM sessions s
JOIN stations st on st.StationID = s.StationID
WHERE st.stationID  = "0039" AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09") as a
JOIN 
(SELECT a.StationID,Count(*) as NumberOfActivePoints
FROM 
(SELECT DISTINCT st.StationID,s.PointID
FROM sessions s
JOIN stations st on st.StationID = s.StationID
WHERE st.stationID  = "0039" AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09" ) as a ) as b 
on a.StationID = b.StationID;

SELECT s.PointID , Count(*) as PointSessions, SUM(s.KwhDelivered) as EnergyDelivered 
FROM sessions s
WHERE s.stationID  = '0039' AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09" 
GROUP BY s.PointID ;
############################################## CSV  ############################################## 
SELECT c.StationID,c.Operator,c.NumberOfChargingSessions ,c.TotalEnergyDelivered , c.NumberOfActivePoints ,d.PointID ,d.PointSessions, d.EnergyDelivered 
FROM
(SELECT a.StationID,a.Operator,a.NumberOfChargingSessions ,a.TotalEnergyDelivered , b.NumberOfActivePoints
FROM 
(SELECT st.StationID,st.Operator,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyDelivered 
FROM sessions s
JOIN stations st on st.StationID = s.StationID
WHERE st.stationID  = "0039" AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2019-10-16 18:13:09") as a
JOIN 
(SELECT a.StationID,Count(*) as NumberOfActivePoints
FROM 
(SELECT DISTINCT st.StationID,s.PointID
FROM sessions s
JOIN stations st on st.StationID = s.StationID
WHERE st.stationID  = "0039" AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2019-10-16 18:13:09" ) as a ) as b 
on a.StationID = b.StationID ) as c
JOIN
(SELECT s.stationID,s.PointID , Count(*) as PointSessions, SUM(s.KwhDelivered) as EnergyDelivered 
FROM sessions s
WHERE s.stationID  = '0039' AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2019-10-16 18:13:09" 
GROUP BY s.PointID ) as d
on c.stationID = d.stationID;
########################################## SessionsPerEV ############################################

##############################################   JSON   ######################################
SELECT a.VehicleID,a.NumberOfChargingSessions ,a.TotalEnergyConsumed , b.NumberOfVisitedPoints
FROM 
(SELECT s.VehicleID,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyConsumed
FROM sessions s
WHERE s.VehicleID  = 5 AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09") as a
JOIN 
(SELECT a.VehicleID,Count(*) as NumberOfVisitedPoints
FROM 
(SELECT DISTINCT s.VehicleID,s.PointID
FROM sessions s
WHERE s.VehicleID  = 5 AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09" ) as a ) as b 
on a.VehicleID = b.VehicleID;

SELECT s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , st.CostPerKwh , ROUND(s.KwhDelivered * st.CostPerKwh,2) as SessionCost 
FROM sessions s
JOIN stations st on s.StationID = st.StationID
WHERE s.VehicleID  = 5 AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2019-10-16 18:13:09"
ORDER BY s.doneCharginTime,s.connectionTime;



##############################################   CSV   ######################################

SELECT c.VehicleID,c.NumberOfChargingSessions ,c.TotalEnergyConsumed , c.NumberOfVisitedPoints , d.SessionID,d.StartedOn, d.FinishedOn,d.Protocol ,d.EnergyDelivered , d.CostPerKwh ,d.SessionCost 
FROM
(SELECT a.VehicleID,a.NumberOfChargingSessions ,a.TotalEnergyConsumed , b.NumberOfVisitedPoints
FROM 
(SELECT s.VehicleID,Count(*) as NumberOfChargingSessions ,SUM(s.KwhDelivered) as TotalEnergyConsumed
FROM sessions s
WHERE s.VehicleID  = 5 AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09") as a
JOIN 
(SELECT a.VehicleID,Count(*) as NumberOfVisitedPoints
FROM 
(SELECT DISTINCT s.VehicleID,s.PointID
FROM sessions s
WHERE s.VehicleID  = 5 AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2018-10-16 18:13:09" ) as a ) as b 
on a.VehicleID = b.VehicleID) as c
JOIN 
(SELECT s.VehicleID,s.SessionID,s.connectionTime as StartedOn,s.doneCharginTime as FinishedOn,s.Protocol ,s.KwhDelivered as EnergyDelivered , st.CostPerKwh , ROUND(s.KwhDelivered * st.CostPerKwh,2) as SessionCost 
FROM sessions s
JOIN stations st on s.StationID = st.StationID
WHERE s.VehicleID  = 5 AND s.connectionTime >= "2018-10-09 13:25:35" AND s.doneCharginTime <= "2019-10-16 18:13:09") as d
on c.VehicleID = d.VehicleID
ORDER BY d.StartedOn,d.FinishedOn;
