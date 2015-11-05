var debug = require('debug')('vivid:core:init');

function start() {

    debug('Starting the Vivid CMS App');

    var _this = this;

    this._express.listen(this._options.port, function () {
        console.log('Vivid App listening on port %d.', _this.port);
    });

}

module.exports = start;