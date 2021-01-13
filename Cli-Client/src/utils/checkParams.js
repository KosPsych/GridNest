const chalk = require('chalk');


module.exports = function(type, param1, param2){
    switch (type){
        case 'login':
            if (param1==undefined || param2==undefined) return true;
            else return false;
    }

}