const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('../utils/checkParams');
const fs = require('fs');
const FormData = require('form-data')


module.exports = function(object){


    if( checkParams('sessionsupd', object.apikey, object.source) ){
        console.log(chalk.red('Error! Source and apikey required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--source   |-s               ex: example.csv'));
        console.log(chalk.green('--apikey '));
    }
    else{

    Url = "https://localhost:8765/evcharge/api/admin/system/sessionsupd"

    const config = {
        headers: {
            'x-observatory-auth' : object.apikey
        }
    }

    //console.log(fs.createReadStream(object.source));
    var formData = new FormData();
    formData.append('file', fs.createReadStream(object.source));
    console.log(formData);

    axios.post(Url, formData, config)
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

}
