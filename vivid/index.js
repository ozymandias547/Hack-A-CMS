var _ = require('lodash');
var utils = require('./lib/vivid-utils');
var request = require('request');
var Promise = require('bluebird');
var express = require('express');
require("babel-core/register");

Promise.promisifyAll(request);

var Vivid = function() {
    this._options = {};
    this._express = express();
};

// Chores:
// 1. setup connection to the main database
// 2. build proper tables/collections
// 2. setup admin endpoints
// 2. setup browser route resolver
// 2. create the database if it doesn't exist.

Vivid.prototype.configure = require("./lib/core/configure");
Vivid.prototype.start = require("./lib/core/start");
Vivid.prototype.addRoute = require("./lib/core/route").addRoute;

var vividSingleton = new Vivid();

module.exports = vividSingleton;