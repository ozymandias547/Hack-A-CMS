/**
 * Lint javascript files.
 */

'use strict';

var paths = require('../config/paths');
var path = require('path');

module.exports = {
	jshint: {
		all: [
		'Gruntfile.js',
		path.normalize(paths.srcPath, '**/*.js')
		],
		options: {
			jshintrc: 'grunt/config/.jshintrc',
			ignores: [
			path.normalize(paths.srcPath + '/common/vendor/**'),
			path.normalize(paths.srcPath + '/desktop/component/infobox/vividInfoBox.js')
			],
			reporter: require('jshint-stylish')
		}
	}
};
