DROP DATABASE IF EXISTS GridNest; 
CREATE DATABASE GridNest;

USE GridNest;
SHOW VARIABLES LIKE "secure_file_priv";
 

CREATE TABLE EnergyProviders (
	EPID	int NOT NULL,
	Name	varchar(100) NOT NULL,
	PRIMARY KEY (EPID));

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/EnergyProviders.csv'
INTO TABLE EnergyProviders
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM EnergyProviders; 


CREATE TABLE Vehicles (
	brand	varchar(100) NOT NULL,
    type varchar(100) NOT NULL,
    model varchar(100) NOT NULL,
    variant varchar(100),
    usable_battery_size DOUBLE,
    VehicleID	int NOT NULL,
	PRIMARY KEY (VehicleID));
    
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Vehicles.csv'
INTO TABLE Vehicles
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM Vehicles;


CREATE TABLE Stations (
StationID	varchar(100) NOT NULL,
Operator 	varchar(100) NOT NULL,
EnergyProvidersID	int NOT NULL,
CostPerKwh	NUMERIC(6,2) NOT NULL,
Latitude	DOUBLE NOT NULL,
Longitude	DOUBLE  NOT NULL,
PRIMARY KEY(StationID),
FOREIGN KEY (EnergyProvidersID) REFERENCES EnergyProviders(EPID)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Stations.csv'
INTO TABLE Stations
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM Stations;


CREATE TABLE Points (
	PointID		varchar(100) NOT NULL,
	StationID	varchar(100) NOT NULL,
	PointOperator varchar(100) NOT NULL,
	PRIMARY KEY (PointID),
    FOREIGN KEY(StationID) REFERENCES Stations(StationID)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Points.csv'
INTO TABLE Points
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM Points;


CREATE TABLE Users (
	Username varchar(100) NOT NULL,
    Password varchar(100) NOT NULL,
    isAdmin tinyint(1) ,
	FirstName	varchar(100) ,
	LastName varchar(100) ,
    email varchar(100) ,
    PRIMARY KEY(Username)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Users.csv'
INTO TABLE Users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM Users;


CREATE TABLE Sessions (
SessionID	varchar(100) NOT NULL,
StationID	varchar(100) NOT NULL,
PointID	 varchar(100) NOT NULL,
Username varchar(100) NOT NULL,
VehicleID int NOT NULL,
connectionTime DATETIME NOT NULL,
doneCharginTime DATETIME NOT NULL,
Timezone varchar(100) NOT NULL,
kWhDelivered DOUBLE NOT NULL,
Protocol varchar(10) NOT NULL,
Payment varchar(10) NOT NULL,
PRIMARY KEY(SessionID),
FOREIGN KEY(StationID) REFERENCES Stations(StationID),
FOREIGN KEY(PointID) REFERENCES Points(PointID),
FOREIGN KEY(Username) REFERENCES Users(Username),
FOREIGN KEY(VehicleID) REFERENCES Vehicles(VehicleID)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Sessions.csv'
INTO TABLE Sessions
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM Sessions;
