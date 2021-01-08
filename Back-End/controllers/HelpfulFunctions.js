function arrayToCSV (data) {
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join('\n');
  }
function convert_datetime(date_ob){
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);
    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}
function convert_date(date){
return date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
    
}

exports.arrayToCSV = arrayToCSV
exports.convert_datetime = convert_datetime
exports.convert_date = convert_date