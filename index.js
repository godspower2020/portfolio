// Require Packages
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const ejsHelper = require('ejs-helper');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const staticroutes = require('./backend/routes/staticroutes')
const adminroutes = require('./backend/routes/adminroutes')

const User = require('./backend/models/User')


// load config file
dotenv.config({ path: './config/config.env' })

// connect DB
connectDB()

// Initialize packages
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }));

// EJS template Layout
app.use(expressLayouts);
// ejs helpers
app.use(ejsHelper({
    formatDate: './helpers/ejs',
}))
app.set('layout', './layouts/yesheader')
app.set('view engine', 'ejs');


// middle ware for 
app.use(session({
    secret: 'hxgdhmdmhdhfjf,juf,utgk.hklh/ohy/ohlhg.yh;ljfjgfjfjfhdhdhdehduruhl',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


passport.use('local', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// login with morgan only in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))


// initialize routes
staticroutes(app)
adminroutes(app)


// Start Server
const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Howdy developer, Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
