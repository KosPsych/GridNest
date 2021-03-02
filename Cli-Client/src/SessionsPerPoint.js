const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){

    
    //Check for parameters
    
    if( checkParams('SessionsPerPoint',object.point,object.datefrom,object.dateto,object.format,object.apikey) ){
        console.log(chalk.red('Error! Please enter correct parameters:'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--point               ex: 1-1-178-817'));
        console.log(chalk.green('--datefrom            ex: 20181009'));
        console.log(chalk.green('--dateto              ex: 20181016'));
        console.log(chalk.green('--format              ex: csv'));
        console.log(chalk.green('--apikey              ex: asdasdmadmadxmawmdxamdma'));
    }
    
    else{

        //Create url
        let baseUrl = createURL('SessionsPerPoint/',object.point,object.datefrom,object.dateto,object.format,object.apikey);

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
        return;
    }

};