/**
 * Lint Sass files.
 */

'use strict';

var paths = require('../config/paths');

module.exports = {
	scsslint: {
		allFiles: [
			paths.scss.files
		],
		options: {
			bundleExec: true,
			colorizeOutput: true,
			compact: false,
			config: paths.configFiles.scssLint
		}
	}
};
