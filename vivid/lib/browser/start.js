module.exports.start = function() {

    var adminEco = require('../../admin/index');

    adminEco.register(this);
    adminEco.addRoutes(this);

};