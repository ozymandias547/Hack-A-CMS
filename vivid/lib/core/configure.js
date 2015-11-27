var _ = require('lodash');
var express = require('express');

module.exports.configure = function(config) {

    if (typeof config !== "undefined") {
        this.mode = config.mode ? config.mode : this.mode;
        this.port = config.port ? config.port : this.port;
    }

};