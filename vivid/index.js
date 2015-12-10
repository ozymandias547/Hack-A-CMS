var _ = require('lodash');
var request = require('request');
var Promise = require('bluebird');
var express = require('express');
var path = require('path');

require("babel-register")({retainLines: true});

//Promise.promisifyAll(request);

var Vivid = function() {
    this.options = {};
    this.layouts = {};
    this.components = {};
    this.routes = {};
    this.datasources = {};
    this.express = express();
    this.port = 8080;
    this.mode = "dev";
};

_.extend(Vivid.prototype,
    require("./lib/server/configure"),
    require("./lib/server/start"),
    require("./lib/register"),
    require("./lib/layout"),
    require("./lib/server/resolver"),
    require("./lib/reducer"),
    require("./lib/server/route"),
    require("./lib/server/coreJSONApi")
);

var vividSingleton = new Vivid();

module.exports = vividSingleton;