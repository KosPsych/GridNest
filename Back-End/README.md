# Back-end API for GridNest App.



### This component was created with [Node.JS](https://nodejs.org/en/).

### Create database  
  1.  In order to create the database, access to the csv data we created is needed. You can download the csv data from this [link](https://drive.google.com/drive/folders/1EywLZMMY3YUusgNSBDR3lRACNtNgE-oV?usp=sharing).
      
  2.  If you are working with Windows on MYSQL Workbench, save the data in the hidden folder "C:\ProgramData\MySQL\MySQL Server 8.0\Uploads" and run the Gridnest.sql script to create Gridnest database.
  3.  In the config/default file, you can enter your own database connection password.
  
### Initialise back-end and start the application 
  1. Run "npm i" , to install all the packages included in the package.json file. 
  2. Run "node server.js" or "npm start", to start the application.
  
### Testing  
   1. For testing we need to create a copy database to perform our tests, while keeping the original data intact.Change the database name to Gridnest_testing in the Gridnest.sql script and run to create the test database. 
   2. On Linux or Mac run "NODE_ENV=test". On Windows run "set NODE_ENV=test".
   3. After changing the env variable, with "npm test" jest will run the "functional.test.js" file.
   4. After testing, make sure the recreate the test database with the sql script.
   5. In order to switch back to the real database,change the env variable again.
