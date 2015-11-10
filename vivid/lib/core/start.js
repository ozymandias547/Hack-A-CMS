var debug = require('debug')('vivid:core:init');

function start() {

    debug('Vivid CMS App start sequence.');

    var _this = this;

    require('../../admin/')(this);

    this._express.listen(this.settings.port, function () {
        console.log('Vivid App listening on port %d.', _this.settings.port);
    });

}



module.exports = start;