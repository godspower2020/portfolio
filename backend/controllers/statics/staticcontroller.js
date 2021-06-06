// display the home.ejs page
exports.displayHome = (req, res) => {
    res.render('statics/', {
        title: 'home page'
    })
}

// display the Portfolio.ejs page
exports.displayPortfolio = (req, res) => {
    res.render('statics/portfolio', {
        title: 'my portfolio', 
        layout: './layouts/fixedheader'
    })
}

// display the resume.ejs page
exports.displayResume = (req, res) => {
    res.render('statics/resume', {
        title: 'my resume', 
        layout: './layouts/noheader'
    })
}

// display the earn.ejs page
exports.displayEarn = (req, res) => {
    res.render('statics/earn', {
        title: 'earn cash', 
        layout: './layouts/fixedheader'
    })
}