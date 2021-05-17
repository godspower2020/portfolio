// display the /messages/client page
exports.displayClients = (req, res) => {
    res.render('admin/clients');
}

// display the /messages/earners page
exports.displayEarners = (req, res) => {
    res.render('admin/earners');
}


// process index form
exports.processClients = (req, res) => {
    console.log(req.body.clientName);
   console.log(req.body.clientEmail);
   console.log(req.body.clientMessage);
} 