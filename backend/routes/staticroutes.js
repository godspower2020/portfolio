module.exports = function(app) {

    const statics = require('../controllers/statics/home')
    
    // Display App Home
    app.route('/')
    .get(statics.displayHome)

    // display portfolio page
    app.route('/portfolio')
    .get(statics.displayPortfolio)

    // display resume page
    app.route('/resume')
    .get(statics.displayResume)

     // display earn page
     app.route('/earn')
     .get(statics.displayEarn)
    
}