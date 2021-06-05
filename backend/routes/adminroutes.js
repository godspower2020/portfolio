module.exports = function (app) {

    const express = require('express')
    const admin = require('../controllers/admin/admincontroller')

    // @desc Display developer login page
    // @route GET /clients
    app.route('/register')
        .get(admin.displayRegister)
        .post(admin.registerAdmin)


    // @desc Display developer login page
    // @route GET /clients
    app.route('/login')
        .get(admin.displayLogin)
        .post(admin.loginAdmin)

    
    // @desc Display client message page
    // @route GET /clients
    app.route('/developer')
        .get(admin.displayDeveloper)


    // @desc Display client message page
    // @route GET /clients
    app.route('/developer/messages')
    .get(admin.displayMessages)
    

    // @desc Display client message page
    // @route GET /clients
    app.route('/developer/messages/clients')
        .get(admin.displayClients)


    // @desc display earners message page
    // @route GET /earners
    app.route('/developer/messages/earners')
        .get(admin.displayEarners)


    // @desc process the client form
    // @route POST /clients
    // app.route('/')
    //     .post(admin.processClients)

}