const chalk = require('chalk');


module.exports = function(type, param1, param2, param3, param4, param5){

    switch (type){
        case 'login':
            if (param1==undefined || param2==undefined) return true
            return false

        case 'logout':
            if (param1==undefined) return true
            return false

        case 'reset':
            if (param1==undefined) return true
            return false

        case 'usermod':
            if(param1==undefined || param2==undefined ||param3==undefined) return true
            return false

        case 'users':
            if(param1==undefined || param2==undefined) return true
            return false

        case 'sessionsupd':
            if(param1==undefined || param2==undefined) return true
            return false

        case 'SessionsPerEv':
            if((param1==undefined || param2==undefined || param3==undefined || param4==undefined || param5==undefined))  return true
            return false

        case 'SessionsPerPoint':
            if((param1==undefined || param2==undefined || param3==undefined || param4==undefined || param5==undefined))  return true
            return false

        case 'SessionsPerProvider':
            if((param1==undefined || param2==undefined || param3==undefined || param4==undefined || param5==undefined))  return true
            return false

        case 'SessionsPerStation':
            if((param1==undefined || param2==undefined || param3==undefined || param4==undefined || param5==undefined))  return true
            return false
    }

}
