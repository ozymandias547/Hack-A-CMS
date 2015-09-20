/**
 * Make sure javascript files adhere to coding styleguide.
 */

'use strict';

var paths = require('../config/paths');

module.exports = {
	jscs: {
		src: paths.js.files,
		options: {
			config: paths.configFiles.jscsrc,
			reporter: require('jscs-stylish').path,
			fix: true,
			verbose: true
		}
	}
};
