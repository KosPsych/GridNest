const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('../utils/checkParams');
const createURL = require('../utils/createURL');


module.exports = function(object){


    if( checkParams('users',object.apikey,object.username) ){
        console.log(chalk.red('Error! Username and apikey required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--username   |-u               ex: user2112'));
        console.log(chalk.green('--apikey '));
        return;
    }



    Url = createURL("admin/users/",object.username)

    const config = {
        headers: {
            'x-observatory-auth' : object.apikey
        }
    }

    axios.get(Url, config )
        .then(res => {
                console.log(chalk.green('Action successfully done'));
                
                console.log(res.data)
            })
        .catch(err => {
            
            console.log(chalk.red(err));
            console.log(chalk.red(err.message));
            
        })
    return;


}