module.exports = function (app) {

    const express = require('express')
    const admin = require('../controllers/admin/admincontroller')
    // const Client = require('../models/Client')
    // const Earner = require('../models/Earner')

    // Display client message page
    // @route GET /messages/clients
    app.route('/clients')
        .get(admin.displayClients)


    // display earners message page
    // @route GET /messages/earners
    app.route('/earners')
        .get(admin.displayEarners)

    // app.route('/clients')
    //     .post(admin.processClients)

}