
'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
    concurrent : {
        dev: ['liveServer'],
        options: {
            logConcurrentOutput: true
        }
    }
};
