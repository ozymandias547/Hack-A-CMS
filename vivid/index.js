var _ = require('lodash');
var utils = require('./lib/vivid-utils');
var request = require('request');
var Promise = require('bluebird');
var express = require('express');

require("babel-register")({retainLines: true});

//Promise.promisifyAll(request);

var Vivid = function() {
    this.options = {};
    this.layouts = {};
    this.components = {};
    this.express = express();
    this.port = 8080;
    this.mode = "dev";
};

_.extend(Vivid.prototype,
    require("./lib/server/configure"),
    require("./lib/server/start"),
    require("./lib/register"),
    require("./lib/layout"),
    require("./lib/resolver"),
    require("./lib/server/route")
);

var vividSingleton = new Vivid();

module.exports = vividSingleton;