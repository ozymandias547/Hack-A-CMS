var _ = require('lodash');

module.exports.configure = function(config) {

    if (typeof config !== "undefined") {
        this.mode = config.mode ? config.mode : this.mode;
        this.port = config.port ? config.port : this.port;
    }

};