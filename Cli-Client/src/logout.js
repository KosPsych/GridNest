const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('./utils/checkParams');
const fs = require('fs')

// module.exports = function(object){

//       //Check for parameters
//       if( checkParams('logout', object.apikey) ){
//           console.log(chalk.red('Error! Please insert your unique apikey to Logout'));
//       }

//       else{
//         //Create url
//         const baseUrl = 'https://localhost:8765/evcharge/api/logout'

//         // add apikey to headers
//         const config = {
//             headers: {
//                 'X-OBSERVATORY-AUTH' : object.apikey
//             }
//         }


//         //Send get request
//         axios.post(baseUrl, {}, config )
//         .then(res => {
//                 console.log(chalk.green('User successfully logged out'));
//             })
//         .catch(err => {
//             console.log(chalk.red(err.message));
//             console.log(chalk.red(err.response.data));
//         })
//         return;
//       }
// };

module.exports = function(object){

    //Check for parameters
    if( checkParams('logout', object.apikey) ){
        console.log(chalk.red('Error! Please insert your unique apikey to Logout'));
    }

    else{
        const data = fs.readFileSync('./Tokens/softeng20bAPI', {encoding:'utf8', flag:'r'})



        try {
        fs.writeFileSync('./Tokens/softeng20bAPI', '')
                } 
        catch(err) {
            console.error(err)
                }  
        if(data != object.apikey) {
            console.log(chalk.red('Error 401 : "Not Authorized"'));
        }
        else console.log(chalk.green('User successfully logged out')) 
    }
}

