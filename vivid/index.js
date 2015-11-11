var _ = require('lodash');
var utils = require('./lib/vivid-utils');
var request = require('request');
var Promise = require('bluebird');
var express = require('express');

require("babel-core/register");

//Promise.promisifyAll(request);

var Vivid = function() {
    this._options = {};
    this._layouts = {};
    this._components = {};
    this._express = express();
    this._mode = "dev";
};

Vivid.prototype.configure = require("./lib/core/configure");
Vivid.prototype.start = require("./lib/core/start");

Vivid.prototype.addRoute = require("./lib/core/elements").addRoute;
Vivid.prototype.addLayout = require("./lib/core/elements").addLayout;
Vivid.prototype.addComponent = require("./lib/core/elements").addComponent;

var vividSingleton = new Vivid();

module.exports = vividSingleton;