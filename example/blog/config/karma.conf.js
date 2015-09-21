var path = require('path'),
    paths = require('./grunt.conf.js'),
    webpack = require( 'webpack' );

module.exports = function ( config ) {
    config.set( {
        frameworks: [
            'jasmine'
        ],
        files: [
            {
                pattern: path.normalize(process.cwd() + '/**/*-test.js')
            },
            {
                pattern: path.normalize(process.cwd()+ '/**/*-fixture.html')
            }
        ],

        plugins: [
            require( 'karma-webpack' ),
            require( 'karma-jasmine' ),
            require( 'karma-chrome-launcher' )
        ],

        webpack: {
            cache: true,
            plugins: [
                new webpack.ProvidePlugin( {
                    _: 'lodash'
                } )
            ]
        },

        reporters: [ 'dots' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [ 'Chrome' ],
        singleRun: true
    } );

    // Set preprocessors after the fact in order to have a dynamic key
    config.preprocessors[
        path.normalize(paths.srcPath + '/**/*-test.js')] = [ 'webpack', 'coverage' ];

};