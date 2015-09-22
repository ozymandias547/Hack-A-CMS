var debug = require('debug')('vivid:core:init');

function start() {

    debug('Starting the Vivid CMS App');

    var vivid = this;

    this.app.listen(this._options.port, function () {
        console.log('\'%s\' Vivid App listening on port %d.', vivid._options.name, vivid._options.port);
    });

}

module.exports = start;