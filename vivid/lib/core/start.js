var debug = require('debug')('vivid:core:init');
var path = require('path');

function start() {

    debug('Vivid CMS App start sequence.');

    var _this = this;

    // Cache busting for .jsx modules.  this allows reloading of .jsx without bouncing the server.
    if (this._mode === "dev") {
        this._express.use(function(req, res, next){
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

    this._express.listen(this.settings.port, function () {
        console.log('Vivid App listening on port %d.', _this.settings.port);
    });

}



module.exports = start;