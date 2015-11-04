/**
 * Grunt path configuration.
 */

'use strict';
var concat = require('path').normalize;

module.exports.browserEntry = concat(process.cwd() + "/src/browser.js");
module.exports.serverEntry = concat(process.cwd() + "/src/server.js");
module.exports.assets = concat(process.cwd() + "/src/static");
module.exports.target = concat(process.cwd() + "/target");
module.exports.srcPath = concat(process.cwd() + "/src");