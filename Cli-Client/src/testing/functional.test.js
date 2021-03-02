const { exec } = require("child_process");
const chalk = require('chalk');
//const { test } = require("shelljs");
let token = "";


// describe('Functional tests', () => {

//     test('Funct Test - 01. Health check status is OK.', () => {
//         exec("node command.js Healthcheck", (error, stdout, stderr) => {
//             expect(stdout).toMatch(/OK/);
//         });
//     });

//     test('Funct Test - 02.Admin login with correct username and password.', () => {
//         exec("node command.js li -u nickzpower -p gridnest", (error, stdout, stderr) => {
//             token = stdout.split("\n")[2];
//             expect(stdout).toMatch("successfully logged in");
//         });
//     });

//     test('Funct Test - 03.Get Sessions from a desired point.', () => {
//         exec(`node command.js spoi --point 1-1-178-817 --datefrom 20181009 --dateto 201016 --format csv --apikey ${token}`, (error, stdout, stderr) => {
//             expect(stdout).toMatch(/1-1-178-817/);
//         });
//     });
    
//     // test('Funct Test - 03.Sessions are successfully reseted by Admin.', () => {
//     //     exec(`node command.js ad -res --apikey ${token}`, (error, stdout, stderr) => {
//     //         expect(stdout).toMatch(/OK/);
//     //     });
//     // });
// });










// test('Funct Test - 03.Sessions are successfully reseted by Admin.', () => {
//     exec(`node command.js Resetsessions --apikey ${token}`, (error, stdout, stderr) => {
//         expect(stdout).toMatch(/OK/);
//     });
// });
