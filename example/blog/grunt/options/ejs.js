var paths = require('../config/paths');
var environmentConfig = require('../../src/config/configLoader');

module.exports = {
	ejs: {
		devServerIncludes: {
			options: {
				devServerUrl: environmentConfig.devServer.host + ":" + environmentConfig.devServer.port
			},
			cwd: paths.srcPath + '/common/dev-server-includes',
			src: ['**/*.html'],
			dest: paths.distPublicPath,
			expand: true,
			ext: '.html'
		}
	}
};