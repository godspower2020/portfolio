module.exports = function (app) {

    const express = require('express')
    const admin = require('../controllers/admin/admincontroller')

    // @desc Display developer register page
    // @route GET /register & @route post /register
    app.route('/register')
        .get(admin.displayRegister)
        .post(admin.registerDeveloper)


    // @desc Display developer login page
    // @route GET /clients
    app.route('/login')
        .get(admin.displayLogin)
        .post(admin.loginDeveloper)


    // @desc Display developers page
    // @route GET /clients
    app.route('/developer')
        .get(admin.displayDeveloper)


    // @desc Display message page
    // @route GET /clients
    app.route('/developer/messages')
        .get(admin.displayMessages)


    // @desc Display client message page
    // @route GET /clients
    app.route('/developer/messages/clients')
        .get(admin.displayClients)
        .post(admin.clientMessage)


    // @desc display earners message page
    // @route GET /earners
    app.route('/developer/messages/earners')
        .get(admin.displayEarners)

}