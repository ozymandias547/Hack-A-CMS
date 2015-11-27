var _ = require('lodash');
var utils = require('./lib/vivid-utils');
var request = require('request');
var Promise = require('bluebird');
var express = require('express');

require("babel-core/register")({retainLines: true});

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
    require("./lib/core/configure"),
    require("./lib/core/start"),
    require("./lib/core/register"),
    require("./lib/core/layout"),
    require("./lib/core/resolver"),
    require("./lib/core/route")
);

var vividSingleton = new Vivid();

module.exports = vividSingleton;