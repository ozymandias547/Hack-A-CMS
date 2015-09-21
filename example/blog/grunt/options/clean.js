/**
 * Preflight task.
 */

'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
	clean: [
		paths.dist
	]
};
