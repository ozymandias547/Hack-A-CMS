/**
 * Grunt path configuration.
 */

'use strict';
var vividConf = require('../vivid.conf.js');
var concat = require('path').normalize;

module.exports.webpackEntry = concat(process.cwd() + "/" + vividConf.common.browserEntry);
module.exports.dist = concat(process.cwd() + "/" + vividConf.common.distributable);
module.exports.serverFile = vividConf.common.serverEntry;