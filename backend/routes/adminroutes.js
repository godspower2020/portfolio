module.exports = function (app) {

    const express = require('express')
    const admin = require('../controllers/admin/admincontroller')

    // @desc Display developer register page
    // @route GET /register & @route post /register
    app.route('/developer/register')
        .get(admin.displayRegister)
        .post(admin.registerDeveloper)


    // @desc Display developer login page
    // @route GET /clients & @route post /login 
    app.route('/developer/login')
        .get(admin.displayLogin)
        .post(admin.loginDeveloper)


    // @desc Display developers page
    // @route GET /developer
    app.route('/developer')
        .get(admin.displayDeveloper)


    // @desc Display message page
    // @route GET /developer/clients
    app.route('/developer/messages')
        .get(admin.displayMessages)


    // @desc Display client messages page
    // @route GET /developer/messages/clients & @route post /developer/messages/clients
    app.route('/developer/messages/clients')
        .get(admin.displayClients)
        .post(admin.clientMessages)

     // @desc Display a single client message modal
    // @route GET /developer/messages/clients/:id & @route post /developer/messages/clients
    app.route('/developer/messages/clients/:clientid')
        .get(admin.displayClientMessageModal)

    // @desc delete client in /developer/messages/clients
    // @route GET /developer/deleteclient/:id
    app.route('/developer/messages/clients/deleteclient/:clientid')
        .get(admin.deleteClients)


    // @desc display earners message page
    // @route GET /developer/messages/earners & @route post /developer/messages/earners
    app.route('/developer/messages/earners')
        .get(admin.displayEarners)
        .post(admin.earnerMessages)

    // @desc delete earner in /developer/messages/earners
    // @route GET /developer/deleteearner/:id
    app.route('/deleteearner/:earnerid')
        .get(admin.deleteEarners)

}