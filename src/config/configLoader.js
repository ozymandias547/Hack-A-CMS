var grunt = require('grunt');
var _ = require('underscore');
var logger = require('../lib/logger/logger.js');
var appConfig;

var defaults = {
	devServer : {
		host: "http://localhost",
		port: 8090
	}
};

try {
	appConfig = _.extend({}, defaults, require('./localConfig.json'));
    console.info('loaded local config');
} catch (e) {}

if(!appConfig) {
    var environment = 'default';
    if(grunt.option('env')) {
        environment = grunt.option('env');
    } else if(process.env.VIVID_ENV) {
        environment = process.env.VIVID_ENV;
    }

    console.info("Environment set to '%s'", environment);
    var environmentConfig = require('./environmentConfig.json');
    var config = environmentConfig[environment];
    if(config) {
        appConfig = _.extend({}, defaults, config);
    } else {
        throw new Error("Unable to load app config. Terminating.");
    }
}

console.info("Loaded environment properties...\n", appConfig);

if(appConfig.logLevel) {
    logger.transports.console.level = appConfig.logLevel;
}

module.exports = appConfig;