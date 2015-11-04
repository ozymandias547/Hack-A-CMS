/**
 * Preflight task.
 */

'use strict';

var paths = require('../../config/grunt.conf.js');

module.exports = {
	clean : {
        "dev": {
            src: [ paths.assets ]
        },
        "prod": {
            src: [ paths.target]
        }
    }
};
