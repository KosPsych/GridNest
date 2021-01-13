
const axios = require('axios');
const chalk = require('chalk');
const qs = require('querystring')
const checkParams = require('../utils/checkParams');
const createURL = require('../utils/createURL');





module.exports = function(object){

    if( checkParams('usermod',object.apikey,object.username, object.password) ){
        console.log(chalk.red('Error! Username,password and apikey required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--username   |-u               ex: user2112'));
        console.log(chalk.green('--passw      |-p               ex: ********'));
        console.log(chalk.green('--apikey '));
        return;
    }

    
    Url = createURL("admin/usermod/",object.username, object.password)
    console.log(Url)

    const config = {
        headers: {
            'x-observatory-auth' : object.apikey
        }
    }


    const requestBody = {
        username: object.username,
        password: object.password
    };


    
    axios.post(Url, qs.stringify(requestBody), config )
        .then(res => {
                console.log(chalk.green('Action successfully done'));
                
                console.log(res.data)
            })
        .catch(err => {
            
            console.log(chalk.red(err));
            console.log(chalk.red(err.message));
            
        })
        return;

return;

}

