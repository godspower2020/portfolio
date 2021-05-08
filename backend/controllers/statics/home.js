// display the home.ejs page
exports.displayHome = (req, res)=>{
    res.render('statics/')
}


// display the Portfolio.ejs page
exports.displayPortfolio = (req, res)=>{
    res.render('statics/portfolio')
}

// display the resume.ejs page
exports.displayResume = (req, res)=>{
    res.render('statics/resume')
}

// display the earn.ejs page
exports.displayEarn = (req, res)=>{
    res.render('statics/earn')
}