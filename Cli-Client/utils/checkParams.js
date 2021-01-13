const chalk = require('chalk');


module.exports = function(type, param1, param2){
    console.log(param1)
    switch (type){
        case 'Login':
            if (param1==undefined || param2==undefined) return false;
            else return true;
    }

}