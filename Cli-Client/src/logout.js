const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){

    
    //Check for parameters
    
    if( checkParams('logout', object.apikey) ){
        console.log(chalk.red('Error! Please insert your unique apikey to Logout'));
    }

    //if(1==0) {}
    else{

        //Create url
        
        const baseUrl = 'https://localhost:8765/evcharge/api/logout'
        
        // add apikey to headers 
        const config = {
            headers: {
                'X-OBSERVATORY-AUTH' : object.apikey
            }
        }

                    
        //Send get request

        axios.post(baseUrl, {},config )
        .then(res => {
                console.log(chalk.green('User successfully logged out'));
            })
        .catch(err => {
            console.log(chalk.red(err.message));
            console.log(chalk.red(err.response.data));
        })
        return;
    }

};