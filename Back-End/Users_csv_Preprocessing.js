//const {readFile} = require("fs");
const bcrypt = require('bcrypt');
const csv = require('csv-parser');
const fs = require('fs');
const users = [];


function writeToCSVFile(users) {
  const filename = 'Database\ Files/Users.csv';
  fs.writeFile(filename, extractAsCSV(users), err => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

function extractAsCSV(users) {
  const header = ["Username,Password,isAdmin,FirstName,LastName,email"];
  const rows = users.map(user =>
     `${user.Username},${user.Password},${user.isAdmin},${user.FirstName},${user.LastName},${user.email}`
  );
  return header.concat(rows).join("\n");
}




fs.createReadStream('Database\ Files/Users.csv')
  .pipe(csv())
  .on('data', (row) => {

    row.Password = bcrypt.hashSync(row.Password, 10);
    row.Password = row.Password.replace(/\r?\n|\r/g, " ");

    const user = {
      Username: row.Username,
      Password: row.Password,
      isAdmin: row.isAdmin,
      FirstName: row.FirstName,
      LastName: row.LastName,
      email: row.email
    }
    users.push(user)
  })
  .on('end', () => {
    //console.table(users)
    writeToCSVFile(users)
    console.log('CSV file successfully processed');
  });
