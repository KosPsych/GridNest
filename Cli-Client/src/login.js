const axios = require('axios');
const chalk = require('chalk');
//const fs = require('fs');
const qs = require('querystring')
//const https = require('https')
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');
/*
const agent = new https.Agent({
    cert: fs.readFileSync("../Back-End/cert.pem"),
    key: fs.readFileSync("../Back-End/key.pem"),
    passphrase: "YYY"
  })
  */
module.exports = function(object){

    
    //Check for parameters
    if( checkParams('Login', object.username, object.passw) ){
        console.log(chalk.red('Error! Username and password required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--username   |-u               ex: user2112'));
        console.log(chalk.green('--passw      |-p               ex: ********'));
    }

    //if(1==0) {}
    else{

        //Create url
        let baseUrl = createURL('/Login');
        //baseUrl = 'http://localhost:8765/evcharge/api/login'
        
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

        axios.post(baseUrl, qs.stringify(requestBody),  {agent}, config )
        .then(res => {
                console.log(chalk.green('User successfully logged in'));
                console.log("Copy the the following token (apikey) to use in authentication for your next requests :");
                console.log(res.data.user_access_token);
            })
        .catch(err => {
            throw err
            //console.log(chalk.red(err.message));
            //console.log(chalk.red(err.response.data));
        })
        return;
    }

};