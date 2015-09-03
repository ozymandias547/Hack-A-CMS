/**
 * Write a banner to static files.
 */

'use strict';

var grunt = require('grunt');
var	paths = require('../config/paths');

module.exports = {
	usebanner: {
		dist: {
			options: {
				position: 'top',
				process: function(filepath) {
					return grunt.template.process(
						'/*!\n* <%= filename %> - ' +
						'Built: <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> CST\n' +
						'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> All Rights Reserved.\n*/',
						{
							data: {
								filename: filepath.match(/\/([^/]*)$/)[1],
								pkg: grunt.file.readJSON('package.json')
							}
						}
					);
				}
			},
			files: {
				src: [
					paths.distPath + '/*.js',
					paths.distPath + '/*.css'
				]
			}
		}
	}
};
