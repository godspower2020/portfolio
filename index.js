// Require Packages
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const staticroutes = require('./backend/routes/staticroutes')
const adminroutes = require('./backend/routes/adminroutes')

const User = require('./backend/models/User')

// load config file
dotenv.config({ path: './config/config.env' })

// passport config
require('./config/passport')(passport)

// connect DB
connectDB()

// Initialize packages
const app = express()

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS template Layout
app.use(expressLayouts);
app.set('layout', './layouts/noheader')
app.set('view engine', 'ejs');

// middle ware for passport
app.use(session({
    secret: 'hxgdhmdmhdhfjf,juf,utgk.hklh/ohy/ohlhg.yh;ljfjgfjfjfhdhdhdehduruhl',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, })
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
