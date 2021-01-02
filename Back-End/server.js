const app = require('./app')

//connect to the database
require('./db')

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000.")
})