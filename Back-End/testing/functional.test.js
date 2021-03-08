const config = require('config');
const request = require('supertest');
const app = require('../app');
let mysql = require('mysql');
let db = config.get('database');
let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5pY2t6cG93ZXIiLCJQYXNzd29yZCI6IiQyYiQxMCRUUVhUTzdjZjZVdVdOVzdCSEJ5dUouaHJ4OWY1VFVkNjNTOGpuQWVmSm5XYTZMQ2JIZi5RMiIsImlzQWRtaW4iOjEsIkZpcnN0TmFtZSI6Ik5pa29sYXMiLCJMYXN0TmFtZSI6IlplcnZhcyIsImVtYWlsIjoibmlja3pwb3dlcjJAZ21haWwuY29tIiwiaWF0IjoxNjE0NjgzNjAwfQ.5gT7v4rQFlylHZE-ZZBChYsT9vZ5V3N8l3f3YgiAC4I";
// beforeAll(() => {
//     connection = mysql.createConnection(db);
// })

// afterAll(() => {
//     connection.end();

// })

describe("Functional tests for hc-login", () => {
test("Functional - 01. Health check status is OK.",() => {
    request(app).get("/evcharge/api/admin/healthcheck")
    .then( (response)=>{   
    expect(response.body).toEqual({status: "OK"})
    expect(response.statusCode).toBe(200) 
    })

})
})

// test("Functional - 02. Admin logs in successfully.", async () => {
//     await request(app)
//     .post("/evcharge/api/login")
//     .send({
//         username: "nickzpower",
//         password: "gridnest"
//     })
//     .then((response)=>{
//         expect(response.statusCode).toBe(200)
//     })
// })
describe("Functional tests for Admin", () => {

    test("AD-01. Admin logs in successfully.",() => {
        request(app)
        .post("/evcharge/api/login")
        .send({
            username: "nickzpower",
            password: "gridnest"
        })
        .then((response)=>{
            expect(response.statusCode).toBe(200)
        })
    })

    test("AD-02. Get SessionsPerEv(json)..Expect status 200",() => {
        request(app)
        .get("/evcharge/api/SessionsPerEV/5/20181009/20181016?format=json")
        .set("x-observatory-auth", token1)
        .then((response)=>{
            expect(response.statusCode).toBe(200)
            expect(response.body.VehicleID).toBe(5)
        })
    })

    test("Functional - 04. Get SessionsPerPoint(json).Expect status 200",() => {
        request(app)
        .get("/evcharge/api/SessionsPerPoint/1-1-178-817/20181009/20181016?format=json")
        .set("x-observatory-auth", token1)
        .then((response)=>{
            expect(response.statusCode).toBe(200)
            expect(response.body.PointID).toBe("1-1-178-817")
        })
    })

    test("Functional - 04. Get SessionsPerPoint(json). Expect error 401",() => {
        request(app)
        .get("/evcharge/api/SessionsPerPoint/1-1-178-817/20181017/20181016?format=json")
        .set("x-observatory-auth", token1)
        .then((response)=>{
            expect(response.statusCode).toBe(401)
        })
    })
})
