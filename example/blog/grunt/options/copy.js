/**
 * Copy files to the build directory.
 */

'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
	copy: {
		publicDirs: {
			expand: true,
			src: '+(component|layout|skin)/**/*.*',
			dest: paths.dist
		},
		nodeModules: {
			expand: true,
			src: '+(node_modules)/**/*.*',
			dest: paths.dist
		},
		vividCMS: {
            expand:true,
			cwd: process.cwd() + '/../../vivid',
            src: '**/*.*',
			dest: paths.dist + "/vivid"
		},
		server: {
			expand: true,
			src: paths.serverFile,
			dest: paths.dist
		},
        packageJSON: {
            expand: true,
            src: "package.json",
            dest: paths.dist
        }
	}
};
