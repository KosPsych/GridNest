const axios = require('axios');
const chalk = require('chalk');
const qs = require('querystring')
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

const fs = require('fs')
function save_user_access_token(user_access_token){
    var dir = './Tokens'
  
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  
    var file = 'softeng20bAPI'
  
    var path = dir + '/' +  file
  
    fs.writeFileSync(path, user_access_token)
    console.log("Token saved successfully\n");
  
    return;
  }

module.exports = function(object){


    //Check for parameters
    if( checkParams('Login', object.username, object.passw) ){
        console.log(chalk.red('Error! Username and password required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--username   |-u               ex: user2112'));
        console.log(chalk.green('--passw      |-p               ex: ********'));
    }

    else{
        //Create url
        let baseUrl = createURL('login');



        //application/x-www-form-urlencoded
        // add token to headers
        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            }
        }
        //Create Request Body
        const requestBody = {
            username: object.username,
            password: object.passw
        };

        //Send post request

        axios.post(baseUrl, qs.stringify(requestBody), config )
        .then(res => {
                save_user_access_token(res.data.user_access_token)
                console.log(chalk.green('User successfully logged in'));
                console.log(chalk.green("Copy the following token (apikey) to use in authentication for your next requests :"));
                console.log(res.data.user_access_token);
            })
        .catch(err => {
            //throw err
            console.log(chalk.red(err));
            console.log(chalk.red(err.message));

        })
        
    }

};
