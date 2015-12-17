var path = require('path');

module.exports.start = function() {

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

    // Register ecosystem components and setup any hardcoded routes
    var adminEco = require('../../admin/admin');
    adminEco.register(this);
    adminEco.addRoutes(this);

    this.setupMiddleWare();
    this.setupCoreJSONApi();
    //this.bindErrorHandler();

    this.express.listen(this.port, function () {
        console.log('Moxi App listening on port %d.', this.port);
        console.log('Running \'%s\' mode.', this.mode);
    }.bind(this));

};