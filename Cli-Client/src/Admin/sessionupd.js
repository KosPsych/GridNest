const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('../utils/checkParams');
const fs = require('fs');
const FormData = require('form-data')
const request = require('request');
const got = require('got');

module.exports = function(object){


    if( checkParams('sessionsupd', object.apikey, object.source) ){
        console.log(chalk.red('Error! Source and apikey required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--source   |-s               ex: example.csv'));
        console.log(chalk.green('--apikey '));
    }
    else{

    Url = "https://localhost:8765/evcharge/api/admin/system/sessionsupd"
    
    
    const options = {
        method: "POST",
        url: Url,
        port: 8765,
        headers: {
            "X-OBSERVATORY-AUTH": object.apikey,
            "Content-Type": "multipart/form-data"
        },
        formData : {
            "file" : fs.createReadStream(object.source)
        }
    };
    
    request(options, function (err, res,body) {

        if(err) {console.log(chalk.red(err));        }
        else {  
            if (res.statusCode != 200) {console.log(chalk.red( `Request failed with status code ${res.statusCode}`));
            console.log(chalk.red(body));
            }
            else {console.log(chalk.green('Action successfully done'));
            console.log(chalk.green(body)) 
            }
        }
    });

    // const config = {
    //     headers: {
    //         'x-observatory-auth' : object.apikey
    //     }
    // }

    // //console.log(fs.createReadStream(object.source));
    // var formData = new FormData();
    // formData.append('file', fs.createReadStream(object.source));
    // //console.log(formData);
    // got.post(Url, formData, config).then(res => {
    //         console.log(chalk.green('Action successfully done'));
    //         console.log(res.data)
    //     })
    // .catch(err => {

    //     console.log(chalk.red(err));
    //     console.log(chalk.red(err.message));

    // })




    // request(options, function (err, res,body) 
    // .then(res => {
    //         console.log(chalk.green('Action successfully done'));
    //         console.log(res.data)
    //     })
    // .catch(err => {

    //     console.log(chalk.red(err));
    //     console.log(chalk.red(err.message));

    // })



    return;
}

}





















    // const config = {
    //     headers: {
    //         'x-observatory-auth' : object.apikey
    //     }
    // }

    //console.log(fs.createReadStream(object.source));
    // var formData = new FormData();
    // formData.append('file', fs.createReadStream(object.source));
    // console.log(formData);

    // axios.post(Url, formData, config)
    // .then(res => {
    //         console.log(chalk.green('Action successfully done'));
    //         console.log(res.data)
    //     })
    // .catch(err => {

    //     console.log(chalk.red(err));
    //     console.log(chalk.red(err.message));

    // })

