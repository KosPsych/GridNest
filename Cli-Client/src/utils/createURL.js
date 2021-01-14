const chalk = require('chalk');


module.exports = function(type, param1, param2){
    let base = 'https://localhost:8765/evcharge/api/';
	let url = base + type;
    switch (type){
        case 'login':
            return url;
            
        case 'logout':
            return url

        case 'admin/usermod/':
            return url  + param1  +"/"+param2

        case "admin/users/":
            return url +param1    

        }

}