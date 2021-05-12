// Require Packages
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const staticroutes = require('./backend/routes/staticroutes')
// const adminroutes = require('./backend/routes/adminroutes')


// load config file
dotenv.config({ path: './config/config.env' })

// connect DB
connectDB()

// Initialize packages
const app = express()

// EJS template Layout
app.use(expressLayouts);
app.set('layout', './layouts/yesheader')
app.set('view engine', 'ejs');


// login with morgan only in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))


// initialize routes
staticroutes(app);


// Start Server
const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Howdy developer, Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
