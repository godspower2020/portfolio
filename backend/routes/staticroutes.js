module.exports = function (app) {

    const statics = require('../controllers/statics/staticcontroller')

    // @desc Display index page
    // @route GET /index
    app.route('/')
        .get(statics.displayHome)

    // @desc display portfolio page
    // @route GET /portfolio
    app.route('/portfolio')
        .get(statics.displayPortfolio)

    // @desc display resume page
    // @route GET /resume
    app.route('/resume')
        .get(statics.displayResume)

    // @desc display earn page
    // @route GET /earn
    app.route('/earn') 
        .get(statics.displayEarn)

}