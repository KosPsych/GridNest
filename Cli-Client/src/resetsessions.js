const axios = require('axios');
const chalk = require('chalk');

module.exports = function(){

  let Url="https://localhost:8765/evcharge/api/admin/resetsessions"
  axios.post(Url)
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