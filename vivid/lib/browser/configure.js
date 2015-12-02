var _ = require('underscore');

module.exports.configure = function(config) {

    if (typeof config !== "undefined") {
        this.mode = config.mode ? config.mode : this.mode;
    }

};