
const axios = require('axios');
const chalk = require('chalk');
const qs = require('querystring')
const checkParams = require('../utils/checkParams');
const createURL = require('../utils/createURL');
const fs = require('fs')





module.exports = function(object){


    if( checkParams('usermod', object.apikey, object.username, object.password) ){
        console.log(chalk.red('Error! At leaset username,password and apikey required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--username   |-u               ex: user2112'));
        console.log(chalk.green('--passw      |-p               ex: ********'));
        console.log(chalk.green('--apikey '));
        console.log(chalk.green('Optional Parameters:'));
        console.log(chalk.green('--first                        ex: nikolas '));        
        console.log(chalk.green('--last                         ex: laskaris '));        
        console.log(chalk.green('--email                        ex: asdasd@hotmail.gr '));        
        console.log(chalk.green('--isadmin                      ex: 0 '));        
        
    }

    else {
        if (object.apikey!= fs.readFileSync('./Tokens/softeng20bAPI', {encoding:'utf8', flag:'r'}) )
            console.log(chalk.red('Error 401 : Not Authorized'));
        
        else{
    
            Url = createURL("admin/usermod/", object.username, object.password)


            const config = {
                headers: {
                    'x-observatory-auth' : object.apikey
                }
            }


            const requestBody = {
                first: object.first,
                last: object.last,
                email: object.email,
                isadmin: object.isadmin
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
        }
    }

}
