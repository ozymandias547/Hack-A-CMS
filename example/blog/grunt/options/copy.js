/**
 * Copy files to the build directory.
 */

'use strict';

var buildConfig = require('../../config/grunt.conf.js');

module.exports = {
	copy: {
        prod: {
            files: [
                {
                    cwd: buildConfig.srcPath,
                    expand: true,
                    src: ['**/*.*'],
                    dest: buildConfig.target
                },
                {
                    cwd: process.cwd() + '/node_modules',
                    expand: true,
                    src: ['**/*.*'],
                    dest: buildConfig.target + "/node_modules"
                }
            ]
        }

	}
};
