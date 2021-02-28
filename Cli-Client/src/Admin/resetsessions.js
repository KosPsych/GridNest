const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('../utils/checkParams');

module.exports = function(object){


  //Check for parameters
  if( checkParams('reset', object.apikey) ){
      console.log(chalk.red('Error! Please insert your unique apikey to Reset'));
  }

  else{

    let Url="https://localhost:8765/evcharge/api/admin/resetsessions"

    // add apikey to headers
    const config = {
        headers: {
            'X-OBSERVATORY-AUTH' : object.apikey
        }
    }
    axios.post(Url, {}, config)
          .then(res => {
                  console.log(res.data);
                })
                .catch(err => {
                  //throw err
                  console.log(chalk.red(err));
                  console.log(chalk.red(err.message));
                })
                return;
              }
}
