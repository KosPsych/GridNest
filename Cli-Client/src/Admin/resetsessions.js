const axios = require('axios');
const chalk = require('chalk');
const checkParams = require('../utils/checkParams');
const fs = require('fs')

module.exports = function(object){


  //Check for parameters
  if( checkParams('reset', object.apikey) ){
      console.log(chalk.red('Error! Please insert your unique apikey to Reset'));
  }

  else{
    if (object.apikey!= fs.readFileSync('./Tokens/softeng20bAPI', {encoding:'utf8', flag:'r'}) )
      console.log(chalk.red('Error 401 : Not Authorized'));
    else {

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
    
    }
  }
}
