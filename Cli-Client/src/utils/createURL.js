const chalk = require('chalk');


module.exports = function(type, param1, param2, param3, param4){
    let base = 'https://localhost:8765/evcharge/api/';
	let url = base + type;
    switch (type){
        case 'login':
            return url;

        case 'logout':
            return url

        case 'admin/usermod/':
            return url  + param1  + "/" + param2

        case "admin/users/":
            return url + param1
        case 'SessionsPerEv/':
            return url + param1 + "/" + param2 + "/" + param3 + "?format=" + param4
        case 'SessionsPerPoint/':
            return url + param1 + "/" + param2 + "/" + param3 + "?format=" + param4
        case 'SessionsPerProvider/':
            return url + param1 + "/" + param2 + "/" + param3 + "?format=" + param4
        case 'SessionsPerStation/':
            return url + param1 + "/" + param2 + "/" + param3 + "?format=" + param4

        }

}
