module.exports = function (app) {

    const admin = require('../controllers/admin/mydisplay')
    // const Client = require('../models/client')
    // const Earner = require('../models/Earner')

    // Display client message page
    // @route GET /messages/clients
    app.route('/clients', { layout: './layouts/noheader' })
        .get(admin.displayClients)


    // display earners message page
    // @route GET /messages/earners
    app.route('/earners', { layout: './layouts/noheader' })
        .get(admin.displayEarners)

}