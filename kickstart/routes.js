const routes = require('next-routes')();

//the first add is to prevent any information to be confused as the address, which would
//break the link, if anyone access the '/campaigns/new', keep showing it.
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('campaigns/:address/requests', 'campaigns/requests/index')
    .add('campaigns/:address/requests/new', 'campaigns/requests/new');

//contains helpers to navigate the user's application and generate link tags to React components
module.exports = routes;