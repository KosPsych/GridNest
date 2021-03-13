#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'


//console.log(process.env.TOKEN);
//node --no-warnings for no warnings
const program = require('commander');
const chalk = require('chalk');
const healthcheck= require('./src/healthcheck.js');
const resetsessions= require('./src/Admin/resetsessions.js');
const login = require('./src/login.js');
const logout = require('./src/logout.js');
const usermod = require('./src/Admin/usermod.js');
const users = require('./src/Admin/users.js');
const sessionupd = require('./src/Admin/sessionupd.js');
const  SessionsPerStation = require('./src/SessionsPerStation');
const  SessionsPerEV = require('./src/SessionsPerEV');
const  SessionsPerPoint = require('./src/SessionsPerPoint');
const  SessionsPerProvider = require('./src/SessionsPerProvider');

program
    .version('1.0.0')
    .description('Command Line Interface Software Engineering NTUA 2020 - Project Gridnest')

program
    .command('Healthcheck')
    .alias('hc')
    .description('Confirms end-to-end connectivity')
    .action(function() {
        healthcheck()
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
.option('--ev  [integer id]','Integer for VehicleID ')
.option('--datefrom  [date]','YYYY-MM-DD')
.option('--dateto  [date]','YYYY-MM-DD')
.option('--format  [format]','csv or json')
.option('--apikey  [token]' , 'Add the token returned from the login')
.action(function(cmdObj) {
    SessionsPerEV(cmdObj);
});
program
    .command('SessionsPerPoint')
    .alias('spoi')
    .description('Data for point in the requested time period')
    .option('--point   [string id]','String for point id')
    .option('--datefrom  [date]','YYYY-MM-DD')
    .option('--dateto  [date]','YYYY-MM-DD')
    .option('--format  [format]','csv or json')
    .option('--apikey  [token]' , 'Add the token returned from the login')
    .action(function(cmdObj) {
        SessionsPerPoint(cmdObj);
     });
program
    .command('SessionsPerStation')
    .alias('sst')
    .description('Data for station in the requested time period')
    .option('--station  [string id]','String for station id ')
    .option('--datefrom  [date]','YYYY-MM-DD')
    .option('--dateto  [date]','YYYY-MM-DD')
    .option('--format  [format]','csv or json')
    .option('--apikey  [token]' , 'Add the token returned from the login')
    .action(function(cmdObj) {
        SessionsPerStation(cmdObj);
     });

program
     .command('SessionsPerProvider')
     .alias('spro')
     .description('Data for energy provider in the requested time period')
     .option('--provider  [integer id]','String for station id ')
     .option('--datefrom  [date]','YYYY-MM-DD')
     .option('--dateto  [date]','YYYY-MM-DD')
     .option('--format  [format]','csv or json')
     .option('--apikey  [token]' , 'Add the token returned from the login')
     .action(function(cmdObj) {
         SessionsPerProvider(cmdObj);
      });
program
    .command('Admin')
    .alias('ad')
    .description('Admin management operations')
    .option('-usm, --usermod ', 'Command for Creating a new user.Requires -u,-p,--apikey')
    .option('-usr, --users  [username]','Command for searching a new user.Requires -u, --apikey')
    .option('-sud, --sessionupd','Command for adding Sessions from csv .Requires -s,--apikey')
    .option('-res, --resetsessions','Command for deleting sessions and resetting to default admins credentials. Requires --apikey')
    .option('-s, --source  [filename]' , 'Csv file wih correct format')
    .option('-u, --username  [username]')
    .option('-p, --password  [password]')
    .option('-f, --first  [first]')
    .option('-l, --last  [last]')
    .option('-e, --email  [email]')
    .option('-i, --isadmin  [isadmin]', '1 for admin, 2 for default admin, whatever for ordinary user')
    .option('--apikey  [token]' , 'Add the token returned from the login')
    .action(function(cmdObj) {

        if (cmdObj.usermod!==undefined && cmdObj.users==undefined && cmdObj.sessionupd==undefined && cmdObj.resetsessions==undefined){
             usermod(cmdObj)
        }
        else if(cmdObj.users!==undefined && cmdObj.usermod==undefined && cmdObj.sessionupd==undefined && cmdObj.resetsessions==undefined){
            users(cmdObj)
        }
        else if(cmdObj.sessionupd!==undefined && cmdObj.users==undefined && cmdObj.usermod==undefined && cmdObj.resetsessions==undefined){
            sessionupd(cmdObj)
        }
        else if(cmdObj.resetsessions!==undefined && cmdObj.users==undefined && cmdObj.usermod==undefined && cmdObj.sessionupd==undefined){
          resetsessions(cmdObj)
        }
        else {
          console.log(chalk.red('Error!Incorrect arguments .'));
          console.log(chalk.green('Choose one from the following admin commands:'));
          console.log(chalk.green('--usermod                  |-usm'));
          console.log(chalk.green('--users                    |-usr'));
          console.log(chalk.green('--sessionupd               |-sud'));
          console.log(chalk.green('--resetsessions            |-res'));
          console.log(chalk.green('For more info about the Admin commands, type "Admin --help"'))

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
else if (   process.argv.length >= 3
        &&  process.argv[2] !== 'SessionsPerPoint'
        &&  process.argv[2] !== 'spoi'
        &&  process.argv[2] !== 'SessionsPerStation'
        &&  process.argv[2] !== 'sst'
        &&  process.argv[2] !== 'SessionsPerEV'
        &&  process.argv[2] !== 'sev'
        &&  process.argv[2] !== 'SessionsPerProvider'
        &&  process.argv[2] !== 'spro'
        &&  process.argv[2] !== 'Admin'
        &&  process.argv[2] !== 'ad'
        &&  process.argv[2] !== 'Healthcheck'
        &&  process.argv[2] !== 'hc'
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
else if ( process.argv.length > 13 && (process.argv[2] == 'SessionsPerPoint' || process.argv[2] == 'spoi' || process.argv[2] == 'SessionsPerStation' || process.argv[2] == 'sst' || process.argv[2] == 'SessionsPerEV' ||  process.argv[2] == 'sev' || process.argv[2] == 'SessionsPerProvider' || process.argv[2] == 'spro')) {
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else if(process.argv.length > 7 && (process.argv[2] == 'li' || process.argv[2] == 'Login')){
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else if( process.argv.length > 5 && (process.argv[2] == 'lo' || process.argv[2] == 'Logout')){
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else if(process.argv.length > 3 && (process.argv[2] == 'hc' || process.argv[2] == 'Healthcheck')){
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else if(process.argv.length > 6 && (process.argv[3] == '-res' || process.argv[3] == '--resetsessions')){
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else if(process.argv.length > 8 && (process.argv[3] == '-usr' || process.argv[3] == '--users' || process.argv[3] == '-sud'  || process.argv[3] == '--sessionupd' )){
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else if(process.argv.length > 18 && (process.argv[3] == '-usm' || process.argv[3] == '--usermod')){
  console.log(chalk.red('Error! Command not supported. Too many arguments'));
  console.log(chalk.green('For more info, type --help'));
}
else program.parse(process.argv);
