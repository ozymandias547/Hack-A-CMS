/**
 * Copy files to the build directory.
 */

'use strict';

var paths = require('../config/paths');

module.exports = {
	copy: {
		publicDirs: {
			expand: true,
			cwd: paths.srcPath,
			src: '+(asset)/**/*.*',
			dest: paths.distPublicPath
		},
		serverDirs: {
			expand: true,
			cwd: paths.srcPath,
			src: '+(lib)/**/*.*',
			dest: paths.distServerPath
		},
		server: {
			src: paths.srcPath+'/myBlog.js',
			dest: paths.distServerPath+'/myBlog.js'
		},
		nodeModules: {
			expand: true,
			cwd: process.cwd()+'/node_modules',
			src: '**/*.*',
			dest: paths.distServerPath+'/node_modules'
		}
	}
};
