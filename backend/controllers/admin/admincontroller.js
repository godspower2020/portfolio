const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcrypt');
const moment = require('moment')
const ejsHelper = require('ejs-helper');
const Client = require('../../models/Client')
const Earner = require('../../models/Earner')
User = mongoose.model('User')
// ejs helpers
const { formatDate, truncate } = require('../../../helpers/helpers')


// display the developer's /register page
exports.displayRegister = (req, res) => {
    res.render('admin/register', {
        title: 'welocme developer pls register',
        layout: './layouts/noheader'
    });
}

// controller for storing developer's registered input in the database
exports.registerDeveloper = (req, res) => {
    const password = req.body.password
    User.register({
        username: req.body.username
    }, password, function (err, saveduser) {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local', { session: false })(req, res, function () {
                res.redirect('/developer/login')
            })
        }
    })
}

// display the developer's /login page
exports.displayLogin = (req, res) => {
    res.render('admin/login', {
        title: 'welocme devloper pls login',
        layout: './layouts/noheader'
    });
}

// controller for checking developer registered input in the database and "logging" him in when he needs to
exports.loginDeveloper = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/developer',
        failureRedirect: '/developer/login',
    })(req, res, next);
}

// display the /developer page
exports.displayDeveloper = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('admin/developer', {
            title: 'welocme developer',
            layout: './layouts/adminheader',
            name: req.user.username
        });
    } else {
        res.redirect('/developer/login')
    }

}

// display the /developer/messages page
exports.displayMessages = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('admin/messages', {
            title: 'developer messages',
            layout: './layouts/adminheader'
        });
    } else {
        res.redirect('/developer/login')
    }
}

// display the /developer/messages/client page 
exports.displayClients = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const clients = await Client.find().lean()
            res.render('admin/clients', {
                title: 'clients messages for developer',
                layout: './layouts/adminheader',
                helpers: {
                    formatDate,
                    truncate,
                },
                moment: moment,
                clients,
            })
        } catch (err) {
            console.error(err);
            res.render('error/500')
        }
    } else {
        res.redirect('/developer/login')
    }
}

// storing client messages in the database and outpouting the content in the table
exports.clientMessages = async (req, res) => {

    try {
        const client = req.body;
        await Client.create(client)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.render('error/form')
    }
}

// outpouting a single client content in the table as a modal
exports.displayClientMessageModal = async (req, res) => {
    try {
        const requestedClientId = req.params.id;
        let client = await Client.findById(requestedClientId).lean()

        if (!client) {
            return res.render('error/404')
        }

        // res.render('/developer/messages/clients', {
        //     client,
        // })
        res.render('admin/clientmodal', {
            title: 'single client message for developer',
            layout: './layouts/justmodal',
            client
        })
    } catch (err) {
        console.error(err);
        res.render('error/404')
    }
}

// delete client in /developer/messages/client page 
exports.deleteClients = async (req, res) => {
    const clientId = req.params.clientid;
    Client.deleteOne({ _id: clientId }, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            console.log("Client successfully deleted");
            res.redirect("back");
        }
    })
}

// display the /developer/messages/earners page
exports.displayEarners = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const earners = await Earner.find().lean()
            res.render('admin/earners', {
                title: 'earners messages for developer',
                layout: './layouts/adminheader',
                moment: moment,
                earners,
            })
        } catch (err) {
            console.error(err);
            res.render('error/500')
        }
    } else {
        res.redirect('/developer/login')
    }
}

// storing earner messages in the database and outpouting the content in the table 
exports.earnerMessages = async (req, res) => {

    try {
        const earner = req.body;
        await Earner.create(earner)
        res.redirect('/earn')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

// outpouting a single client content in the table as a modal
exports.displayEarnerMessageModal = async (req, res) => {
    try {
        const requestedEarnerId = req.params.id;
        let earner = await Earner.findById(requestedEarnerId).lean()

        if (!earner) {
            return res.render('error/404')
        }

        // res.render('/developer/messages/earners', {
        //     earner,
        // })
        res.render('admin/earnermodal', {
            title: 'single earner message for developer',
            layout: './layouts/justmodal',
            earner
        })
    } catch (err) {
        console.error(err);
        res.render('error/404')
    }
}

// delete earner in /developer/messages/earner page 
exports.deleteEarners = async (req, res) => {
    const earnerId = req.params.earnerid;
    Earner.deleteOne({ _id: earnerId }, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            console.log("earner successfully deleted");
            res.redirect("back");
        }
    })
}

exports.logoutDeveloper = async (req, res) => {
    req.logout();
    res.redirect('/developer/login');
}