var debug = require('debug')('vivid:core:init');
var _ = require('lodash');
var express = require('express');

function init(config) {

    debug('Initializing the Vivid CMS App');

    if (_.isString(config)) {
        try {
            config = require(process.cwd() + "/" + config);
        } catch (e) {}
    }

    var common = config["common"] ? config["common"] : {};

    if (process.env.NODE_ENV) {
        _.extend(this._options, common, config[process.env.NODE_ENV])
    } else {
        _.extend(this._options, common, config["common"], config["dev"]);
    }

    this.app = express();
    this.app.use('/admin', require('../../admin/routes')(this));

}

module.exports = init;