
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
//node --no-warnings for no warnings
const program = require('commander');
const chalk = require('chalk');
const healthcheck= require('./src/healthcheck.js');
const resetsessions= require('./src/resetsessions.js');
const login = require('./src/login.js');
const logout = require('./src/logout.js');
const usermod = require('./src/Admin/usermod.js');
const users = require('./src/Admin/users.js');
const sessionupd = require('./src/Admin/sessionupd.js');

program
    .version('1.0.0')
    .description('Command Line Interface Software Engineering NTUA 2020 - Project Gridnest')

program
    .command('healthcheck')
    .alias('hc')
    .description('Confirms end-to-end connectivity')
    .action(function() {
        healthcheck()
     });


program
    .command('Reset')
    .alias('r')
    .description('Resets Sessions and Default Admin')
    .action(function() {
        resetsessions()
     });

program
    .command('Login')
    .alias('li')
    .description('User Log In')
    .option('-u, --username [username]', 'User name')
    .option('-p, --passw [passw]', 'Password')
    .action(function(cmdObj){
        login(cmdObj);
    });
program
    .command('Logout')
    .alias('lo')
    .description('User Log Out')
    .option('--apikey  [token]' , 'Add the token returned from the login')
    .action(function(cmdObj) {
        logout(cmdObj);
    });
program
    .command('SessionsPerEv')
    .alias('sev')
    .description('Data for vehicle in the requested time period')
    .option('--ev  [interger id]','Integer for VehicleID ')
    .option('--datefrom  [date]','YYYY-MM-DD')
    .option('--dateto  [date]','YYYY-MM-DD')
    .option('--format  [format]','csv or json')
    .option('--apikey  [token]' , 'Add the token returned from the login')
    .action(function(cmdObj) {
       console.log(cmdObj.ev);
    });
program
    .command('SessionsPerPoint')
    .alias('spoi')
    .description('Data for point in the requested time period')
    .option('--point   [interger id]','String for point id')
    .option('--datefrom  [date]','YYYY-MM-DD')
    .option('--dateto  [date]','YYYY-MM-DD')
    .option('--format  [format]','csv or json')
    .option('--apikey  [token]' , 'Add the token returned from the login')

program
    .command('SessionsPerStation')
    .alias('sst')
    .description('Data for station in the requested time period')
    .option('--ev  [interger id]','String for station id ')
    .option('--datefrom  [date]','YYYY-MM-DD')
    .option('--dateto  [date]','YYYY-MM-DD')
    .option('--format  [format]','csv or json')
    .option('--apikey  [token]' , 'Add the token returned from the login')
 
program
    .command('Admin')
    .alias('ad')
    .description('Admin management operations')
    .option('-usm, --usermod ', 'Command for Creating a new user.Requires -u,-p,--apikey')
    .option('-usr, --users  [username]','Command for searching a new user.Requires --apikey')
    .option('-sud, --sessionupd','Command for adding Sessions from csv .Requires -s,--apikey')
    .option('-s, --source  [filename]' , 'Csv file wih correct format')
    .option('-u, --username  [username]')
    .option('-p, --password  [password]')
    .option('--apikey  [token]' , 'Add the token returned from the login')
    .action(function(cmdObj) {
        
        if (cmdObj.usermod!==undefined && cmdObj.users==undefined && cmdObj.sessionupd==undefined){
             usermod(cmdObj)
        }
        else if(cmdObj.users!==undefined && cmdObj.usermod==undefined && cmdObj.sessionupd==undefined){
            users(cmdObj)
        }
        else if(cmdObj.sessionupd!==undefined && cmdObj.users==undefined && cmdObj.usermod==undefined){
            sessionupd(cmdObj)
        }
        

    });


if( process.argv.length < 3 ){
    console.log(chalk.red('Error! Mandatory parameters not detected'));
    console.log(chalk.green('Choose a scope from:'));
    console.log(chalk.green('SessionsPerPoint            |spoi'));
    console.log(chalk.green('SessionsPerStation          |sst'));
    console.log(chalk.green('SessionsPerEV               |sev'));
    console.log(chalk.green('HealthCheck                 |hc'));
    console.log(chalk.green('Reset                       |r'));
    console.log(chalk.green('Admin                       |ad'));
    console.log(chalk.green('Login                       |li'));
    console.log(chalk.green('Logout                      |lo'));
    console.log(chalk.green('For more info, type "scope" --help'));
}
else if (    process.argv[2] !== 'SessionsPerPoint'
         &&  process.argv[2] !== 'spoi'
         &&  process.argv[2] !== 'SessionsPerStation'
         &&  process.argv[2] !== 'sst'
         &&  process.argv[2] !== 'SessionsPerEV'
         &&  process.argv[2] !== 'sev'
         &&  process.argv[2] !== 'Admin'
         &&  process.argv[2] !== 'ad'
         &&  process.argv[2] !== 'Healthcheck'
         &&  process.argv[2] !== 'hc'
         &&  process.argv[2] !== 'Reset'
         &&  process.argv[2] !== 'r'
         &&  process.argv[2] !== 'Login'
         &&  process.argv[2] !== 'li'
         &&  process.argv[2] !== 'Logout'
         &&  process.argv[2] !== 'lo'
         &&  process.argv[2] !== '--help'
         &&  process.argv[2] !== '-h'
){
    console.log(chalk.red('Error! Command not supported'));
    console.log(chalk.green('For more info, type --help'));
}
else program.parse(process.argv);
