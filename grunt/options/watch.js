/**
 * Watch for changes and automatically compile.
 */

'use strict';

var path = require('path');
var	paths = require('../config/paths');

module.exports = {
	watch: {
		app: {
			files: [
				paths.scss.files,
				paths.js.files,
				paths.template.files
			],
			options: {
				spawn: true,
				interrupt: true
			},
			tasks: [
				'webpack:build-dev'
			]
		},
		intellij: {
			files: [
				paths.scss.files,
				paths.js.files,
				paths.template.files
			],
			tasks: [
				'webpack:build-dev'
			]
		}
	}
};
