// display the /messages/client page
exports.displayClients = (req, res) => {
    res.render('admin/clients', { title: 'clients messages', layout: './layouts/noheader' });
}

// display the /messages/earners page
exports.displayEarners = (req, res) => {
    res.render('admin/earners', { title: 'earners messages', layout: './layouts/noheader' });
}

