const config = require('config');
const request = require('supertest');
const app = require('../app');
let mysql = require('mysql');
let db = config.get('database');
let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5pY2t6cG93ZXIiLCJQYXNzd29yZCI6IiQyYiQxMCRUUVhUTzdjZjZVdVdOVzdCSEJ5dUouaHJ4OWY1VFVkNjNTOGpuQWVmSm5XYTZMQ2JIZi5RMiIsImlzQWRtaW4iOjEsIkZpcnN0TmFtZSI6Ik5pa29sYXMiLCJMYXN0TmFtZSI6IlplcnZhcyIsImVtYWlsIjoibmlja3pwb3dlcjJAZ21haWwuY29tIiwiaWF0IjoxNjE0NjgzNjAwfQ.5gT7v4rQFlylHZE-ZZBChYsT9vZ5V3N8l3f3YgiAC4I";
let token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImpidXR0eSIsIlBhc3N3b3JkIjoiJDJiJDEwJENCckNkS0tjLnpvSS9xdlA4WC5SRU9ObUlXbVNkOFZSWHJoVHVHUGdXUEpCZC85V1Y2NXQ2IiwiaXNBZG1pbiI6MCwiRmlyc3ROYW1lIjoiSmFtZXMiLCJMYXN0TmFtZSI6IkJ1dHQiLCJlbWFpbCI6ImpidXR0QGdtYWlsLmNvbSIsImlhdCI6MTYxNTQ2MDkzM30.V8pi6biNgkA9okiB_Z5qy2qZ56acqFGE06cCI8a-TsE";

describe("Functional tests login .Expect 200", () => {

test("L-01. Admin logs in successfully.",async() => {
    const response = await request(app)
    .post("/evcharge/api/login")
    .send({
        username: "nickzpower",
        password: "gridnest"
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("user_access_token")
})

test("L-02. Admin tries to log in with wrong password.Expect 401",async() => {
    const response = await request(app)
    .post("/evcharge/api/login")
    .send({
        username: "nickzpower",
        password: "grist"
    })
    expect(response.statusCode).toBe(401)
    expect(response.text).toMatch(/Incorrect/)
    
})

test("L-03. Wrong user tries to log in.Expect 400",async() => {
    const response = await request(app)
    .post("/evcharge/api/login")
    .send({
        username: "ckzpower",
        password: "grist"
    })
    expect(response.statusCode).toBe(400)
    expect(response.text).toMatch(/Incorrect/)
    
})

})

describe("Functional tests for User", () => {

    test("Us-01. Get SessionsPerEv(csv)..Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerEV/5/20181009/20181016?format=csv")
        .set("x-observatory-auth", token2)
        expect(response.statusCode).toBe(200)

    })

    test("Us-02. Get SessionsPerPoint(csv).Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerPoint/1-1-178-817/20181009/20181016?format=csv")
        .set("x-observatory-auth", token2)
        expect(response.statusCode).toBe(200)
    })

    test("Us-03. Get SessionsPerPoint(json). Expect error 402",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerPoint/1-1-178-817/20181017/20181016?format=json")
        .set("x-observatory-auth", token2)
        expect(response.statusCode).toBe(402)
        
    })

    test("Us-04. Get SessionsPerStation(csv). Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerStation/0001/20181009/20181016?format=csv")
        .set("x-observatory-auth", token2)
        expect(response.statusCode).toBe(200)
        
    })

    test("Us-05. Get SessionsPerStation(json). Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerStation/0001/20181009/20181016?format=json")
        .set("x-observatory-auth", token2)
        expect(response.statusCode).toBe(200)
        
    })

    test("Us-06. Add User . Expect status 401",async() => {
        const response = await request(app)
        .post("/evcharge/api/admin/usermod/aaaaa/aaaaa")
        .set("x-observatory-auth", token2)
        .send({first_name: "alexis", last_name : "aaaaa" ,
                 email : "aaaaa@gmail.com" , isAdmin : 0 })
        expect(response.statusCode).toBe(401)
    })

    test("Us-07. Get User . Expect status 401",async() => {
        const response = await request(app)
        .get("/evcharge/api/admin/users/aaaaa")
        .set("x-observatory-auth", token2)
        expect(response.statusCode).toBe(401)
    })

    test("Us-08. Resetsessions . Expect status 401",async() => {
        const response = await request(app)
        .post("/evcharge/api/admin/resetsessions")
        .set("x-observatory-auth", token2)
        expect(response.text).toMatch(/Authorization/)
    })
})

describe("Functional tests for Admin", () => {

    test("AD-01. Get SessionsPerEv(json)..Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerEV/5/20181009/20181016?format=json")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(200)
        expect(response.body.VehicleID).toBe(5)

    })

    test("AD-02. Get SessionsPerPoint(json).Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerPoint/1-1-178-817/20181009/20181016?format=json")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(200)
        expect(response.body.PointID).toBe("1-1-178-817")
    })

    test("AD-03. Get SessionsPerPoint(json). Expect error 402",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerPoint/1-1-178-817/20181017/20181016?format=json")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(402)
        
    })

    test("AD-04. Get SessionsPerStation(csv). Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerStation/0001/20181009/20181016?format=csv")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(200)
        
    })

    test("AD-05. Get SessionsPerStation(csv). Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/SessionsPerStation/0001/20181009/20181016?format=csv")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(200)
        
    })

    test("AD-06. Add User . Expect status 200",async() => {
        const response = await request(app)
        .post("/evcharge/api/admin/usermod/aaaaa/aaaaa")
        .set("x-observatory-auth", token1)
        .send({first_name: "alexis", last_name : "aaaaa" ,
                 email : "aaaaa@gmail.com" , isAdmin : 0 })
        expect(response.statusCode).toBe(200)
        expect(response.text).toMatch(/Adding/)

    })

    test("AD-07. Update added User . Expect status 200",async() => {
        const response = await request(app)
        .post("/evcharge/api/admin/usermod/aaaaa/asdaw")
        .set("x-observatory-auth", token1)
        .send({first_name: "alexis", last_name : "aaaaa" ,
                 email : "aaaaa@gmail.com" , isAdmin : 0 })
        expect(response.statusCode).toBe(200)
        expect(response.text).toMatch(/Password/)
    })

    test("AD-08. Get a User that exists. Expect status 200",async() => {
        const response = await request(app)
        .get("/evcharge/api/admin/users/aaaaa")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty('Username')
        expect(response.body[0]).toHaveProperty('Password')
    })

    test("AD-09. Get User which doesnt exist. Expect status 400",async() => {
        const response = await request(app)
        .get("/evcharge/api/admin/users/bbbbbbbbbbbb")
        .set("x-observatory-auth", token1)
        expect(response.statusCode).toBe(400)
        expect(response.text).toMatch(/No/)
    })


})


