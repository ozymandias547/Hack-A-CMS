
'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
    watch: {
        scripts: {
            files: [paths.srcPath + '/**/*.js'],
            tasks: ['express:dev'],
            options: {
                spawn: true
            }
        }
    }
};
