var path = require('path');
var	paths = require('../config/paths');

module.exports = {
	// Vendor aliases.
	jquery: path.normalize(paths.srcPath + '/common/vendor/jquery-1.10.2.min.js'),

	// Util aliases.
	'utitilies.browserState': path.normalize(paths.srcPath + '/common/component/BrowserState.js'),

	// Sass aliases.
	scss: paths.scss.path
};
