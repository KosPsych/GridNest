const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){


    //Check for parameters

    if( checkParams('SessionsPerEv' ,object.ev, object.datefrom, object.dateto, object.format, object.apikey)){
        console.log(chalk.red('Error! Please enter correct parameters:'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--ev                  ex: 5'));
        console.log(chalk.green('--datefrom            ex: 20181009'));
        console.log(chalk.green('--dateto              ex: 20181016'));
        console.log(chalk.green('--format              ex: csv'));
        console.log(chalk.green('--apikey              ex: asdasdmadmadxmawmdxamdma'));
    }

    else{

        if (object.apikey!= fs.readFileSync('./Tokens/softeng20bAPI', {encoding:'utf8', flag:'r'}) )
        console.log(chalk.red('Error 401 : Not Authorized'));
        else {
            //Create url
            let baseUrl = createURL('SessionsPerEv/',object.ev, object.datefrom, object.dateto, object.format, object.apikey);

            // add apikey to headers
            const config = {
                headers: {
                    'x-observatory-auth' : object.apikey
                }
            }


            //Send get request

            axios.get(baseUrl,config )
            .then(res => {
                if (object.format =='csv')
                console.log(chalk.green(res.data));
                else
                console.log(res.data);
                })
            .catch(err => {
                console.log(chalk.red(err.message));
                console.log(chalk.red(err.response.data));
            })
        }
    }
};
