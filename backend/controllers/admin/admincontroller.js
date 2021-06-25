const mongoose = require('mongoose')
const passport = require('passport')
const moment = require('moment')
const Client = require('../../models/Client')
const Earner = require('../../models/Earner')
User = mongoose.model('User')


// display the /register page
exports.displayRegister = (req, res) => {
    res.render('admin/register', {
        title: 'welocme developer pls register'
    });
}

// controller for storing developer registered input in the database
exports.registerDeveloper = (req, res) => {
    const password = req.body.password
    User.register({
        username: req.body.username
    }, password, function (err, saveduser) {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local', { session: false })(req, res, function () {
                res.redirect('/login')
            })
        }
    })
}

// display the /login page
exports.displayLogin = (req, res) => {
    res.render('admin/login', {
        title: 'welocme devloper pls login'
    });
}

// controller for checking developer registered input in the database and "logging" him in when he needs to
exports.loginDeveloper = (req, res) => {
    User.findOne({ username: req.body.username }, function (err, userfound) {
        console.log('i reach here')
        console.log(req.body)
        if (err) {
            console.log(err)
        } else if (userfound) {
            console.log(userfound)
            const user = new User({
                username: req.body.username,
                password: req.body.password
            })
            passport.authenticate('local', function (err, user) {
                console.log('pass dey')
                if (err) {
                    console.log(err)
                } else {
                    if (user) {
                        req.login(user, function (err) {
                            console.log('success')
                            res.redirect('/developer')
                        })
                    } else {
                        console.log('password incorrect')
                        res.redirect('back')
                    }
                }
            })
        } else {
            console.log('user doesnt exist')
            res.redirect('back')
        }
    })
}

// display the /developer page
exports.displayDeveloper = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('admin/developer', {
            title: 'welocme developer',
            layout: './layouts/adminheader'
        });
    } else {
        res.redirect('/login')
    }

}

// display the /developer/messages page
exports.displayMessages = (req, res) => {
    res.render('admin/messages', {
        title: 'developer messages',
        layout: './layouts/adminheader'
    });
}

// display the /developer/messages/client page 
exports.displayClients = async (req, res) => {
    try {
        const clients = await Client.find().lean()
        res.render('admin/clients', {
            title: 'clients messages for developer',
            layout: './layouts/adminheader',
            moment: moment,
            clients,
        })
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
}

// storing client messages in the database and outpouting the content in the table
exports.clientMessage = async (req, res) => {

    try {
        const client = req.body;  //this should work
        await Client.create(client)
        res.redirect('/')
    } catch (err) {
        console.error(err)
        res.render('error/500')
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
}

// storing earner messages in the database and outpouting the content in the table
exports.earnerMessage = async (req, res) => {

    try {
        const earner = req.body;  //this should work
        await Earner.create(earner)
        res.redirect('/earn')
    } catch (err) {
        console.error(err)
        res.render('error/500')
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
