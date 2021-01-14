const chalk = require('chalk');


module.exports = function(type, param1, param2,param3){
    
    switch (type){
        case 'login':
            if (param1==undefined || param2==undefined) return true
            return false

        case 'logout':
            if (param1==undefined) return true
            return false

        case 'usermod':
            if(param1==undefined || param2==undefined ||param3==undefined) return true
            return false   

        case 'users':
            if(param1==undefined || param2==undefined) return true
            return false     
    }

}