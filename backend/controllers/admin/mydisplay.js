// display the /messages/client page
exports.displayClients = (req, res) => {
    res.render('admin/clients');
}

// display the /messages/earners page
exports.displayEarners = (req, res) => {
    res.render('admin/earners');
}

