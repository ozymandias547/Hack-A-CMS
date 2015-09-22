var _ = require('lodash');
var utils = require('./lib/vivid-utils');
var request = require('request');
var Promise = require('bluebird');
require("babel/register");

Promise.promisifyAll(request);

var Vivid = function() {
    this._options = {};
};

// Chores:
// 1. setup connection to the main database
// 2. build proper tables/collections
// 2. setup admin endpoints
// 2. setup browser route resolver
// 2. create the database if it doesn't exist.

Vivid.prototype.init = require("./lib/core/init");
Vivid.prototype.start = require("./lib/core/start");

module.exports = Vivid;