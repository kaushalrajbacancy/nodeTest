require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 8000
const app = express();

require('./Configs/globals');

app.use(bodyParser.json()) // Allow application JSON
app.use(bodyParser.urlencoded({ extended: false })) // Allow URL encoded parser
app.use(cors()) // Allowed all cors request origins


// Response Handler
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
})

// Routes
const appRoutes = require('./Routes')
appRoutes(app)


// Global Error Handler
app.use ((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.handler.serverError(err)
})

// Start Server
app.listen(port, () => {
    console.log(`Server started on ${port} :)`)
})