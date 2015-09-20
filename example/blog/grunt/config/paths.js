/**
 * Grunt path configuration.
 */

'use strict';

var _ = require('underscore');
var path = require('path');
var glob = require('glob');

var srcPath = path.normalize(process.cwd() + '/src');
var distPath = path.normalize(process.cwd() + '/dist');
var distPublicPath = path.normalize(distPath + '/public');
var distServerPath = path.normalize(distPath + '/server');

var gruntPath = path.normalize(process.cwd() + '/grunt');
var jsPath = path.normalize(srcPath + '/**/!(vendor)');
var scssPath = path.normalize(process.cwd() + '/skin');
var templatePath = path.normalize(srcPath + '/template');

var jscsConfig = path.normalize(gruntPath + '/config/.jscsrc');
var scssLintConfig = path.normalize(gruntPath + '/config/.skin-lint.yml');
var karmaConfig = path.normalize(process.cwd() + '/karma.conf.js');

var jsFiles = path.normalize(jsPath + '/*.js');
var gruntFiles = path.normalize(gruntPath + '/**/*.js');
var scssFiles = path.normalize(scssPath + '/**/*.scss');
var templateFiles = path.normalize(srcPath + '/**/*.tpl.html');

module.exports = {

	distPath: distPath,
	distPublicPath: distPublicPath,
	distServerPath: distServerPath,
	srcPath: srcPath,

	// View-specific paths.
	templatePath: templatePath,

	// Paths to build configuration.
	configFiles: {
		karma: karmaConfig,
		scssLint: scssLintConfig,
		jscsrc: jscsConfig
	},

	// Javascript files.
	js: {
		path: jsPath,
		files: [jsFiles, gruntFiles]
	},

	// Template files.
	template: {
		files: templateFiles
	},

	// Sass files.
	scss: {
		path: scssPath,
		files: scssFiles
	}
};
