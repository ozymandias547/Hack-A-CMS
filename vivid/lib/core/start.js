var debug = require('debug')('vivid:core:init');
var path = require('path');

module.exports.start = function() {

    debug('Vivid CMS App start sequence.');

    // Cache busting for .jsx modules.  this allows reloading of .jsx without bouncing the server.
    if (this.mode === "dev") {
        this.express.use(function(req, res, next){
            for(var _path in require.cache){
                if(path.extname(_path) == '.jsx'){
                    delete require.cache[_path];
                }
            }
            next();
        });
    }

    var adminEco = require('../../admin/');

    adminEco.register(this);
    adminEco.addRoutes(this);

    this.express.listen(this.port, function () {
        console.log('Vivid App listening on port %d.', this.port);
        console.log('Running \'%s\' mode.', this.mode);
    }.bind(this));

};