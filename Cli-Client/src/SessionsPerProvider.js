const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){

    
    //Check for parameters
    
    if( checkParams('SessionsPerStations', object.apikey) ){
        console.log(chalk.red('Error! Please enter correct parameters:'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--station             ex: 1'));
        console.log(chalk.green('--datefrom            ex: 20181009'));
        console.log(chalk.green('--dateto              ex: 20181016'));
        console.log(chalk.green('--format              ex: csv'));
        console.log(chalk.green('--apikey              ex: asdasdmadmadxmawmdxamdma'));
    }
    
    //if(1==0) {}
    else{

        //Create url
        let baseUrl = createURL('/SessionsPerStation',object.provider,object.datefrom,object.dateto,object.format,object.token);
        //const baseUrl = 'https://localhost:8765/evcharge/api/SessionsPerProvider/1/20181009/20181016?format=csv'

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