'use strict'
// load dependencies
const express = require('express')
const studentRouter = require('./routes/student.js')

// create the express app
const app = express()

// configure express middleware
app.use(express.json())
app.use('/api/students', studentRouter)

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
