const chalk = require('chalk');
const checkParams = require('../utils/checkParams');
const fs = require('fs');
const request = require('request');

module.exports = function(object){


    if( checkParams('sessionsupd', object.apikey, object.source) ){
        console.log(chalk.red('Error! Source and apikey required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--source   |-s               ex: example.csv'));
        console.log(chalk.green('--apikey '));
    }
    else{

        if (object.apikey!= fs.readFileSync('./Tokens/softeng20bAPI', {encoding:'utf8', flag:'r'}) )
            console.log(chalk.red('Error 401 : Not Authorized'));
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
        }
    
    }

}