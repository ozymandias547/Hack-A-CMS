
'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
    express : {
        dev: {
            options: {
                background: true,
                script: './src/server.js'
            }
        }
    }
};
