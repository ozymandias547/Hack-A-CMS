/**
 * Unit testing tasks.
 */

'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
	karma: {
        unit: {
            configFile: process.cwd() + "/config/karma.conf.js",
            port: 9999,
            singleRun: true,
            browsers: ['PhantomJS'],
            logLevel: 'ERROR'
        }
	}
};
