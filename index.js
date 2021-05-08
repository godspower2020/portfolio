// Require Packages
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const ejs = require('ejs')
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const staticroutes = require('./backend/routes/staticroutes')
const adminroutes = require('./backend/routes/adminroutes')


// load config file
dotenv.config({ path: './config/config.env' })

// connect DB
connectDB()

// Initialize packages
const app = express()

// initialize routes
staticroutes(app);

// login with morgan only in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static('public'))

// ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

// initialize routes 



// Start Server
const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Howdy developer, Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
