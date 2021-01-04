DROP DATABASE IF EXISTS GridNest; #when you run it for the first time this needs to be in comments
CREATE DATABASE GridNest;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'GridNest';
flush privileges;
USE GridNest;
SHOW VARIABLES LIKE "secure_file_priv";
 
CREATE TABLE Admins (
	AdminID          int NOT NULL,
	UserName         varchar(100) NOT NULL,
	Password         varchar(100) NOT NULL,
	PRIMARY KEY (AdminID));
    

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Admins.csv'
INTO TABLE Admins
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 

SELECT *
FROM Admins;


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
    usable_battery_size NUMERIC(6,3),
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
Latitude	NUMERIC(12,8) NOT NULL,
Longitude	NUMERIC(12,8)  NOT NULL,
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
	UserID		varchar(100) NOT NULL,
	first_name	varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    VehicleID int NOT NULL,
    Username varchar(100) NOT NULL,
    Password varchar(100) NOT NULL,
    PRIMARY KEY(UserID),
    FOREIGN KEY(VehicleID) REFERENCES Vehicles(VehicleID)
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
UserID 	varchar(100) NOT NULL,
connectionTime DATETIME NOT NULL,
disconnectTime DATETIME NOT NULL,
doneCharginTime DATETIME NOT NULL,
Timezone varchar(100) NOT NULL,
kWhDelivered DOUBLE NOT NULL,
VehicleID int NOT NULL,
Protocol varchar(10) NOT NULL,
Payment varchar(10) NOT NULL,
PRIMARY KEY(SessionID),
FOREIGN KEY(StationID) REFERENCES Stations(StationID),
FOREIGN KEY(PointID) REFERENCES Points(PointID),
FOREIGN KEY(UserID) REFERENCES Users(UserID),
FOREIGN KEY(VehicleID) REFERENCES Vehicles(VehicleID)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/database files/Sessions.csv'
INTO TABLE Sessions
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; 


SELECT *
FROM Sessions;
