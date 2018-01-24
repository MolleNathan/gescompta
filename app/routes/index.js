const clientRoutes = require('./client_routes');
const produitRoutes = require('./produit_routes');


module.exports = function(app, db) {
    clientRoutes(app, db);
    produitRoutes(app, db);

    // Other route groups could go here, in the future

};
