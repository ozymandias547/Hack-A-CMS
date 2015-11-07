'use strict';

var	webpack = require('webpack');
var	gruntConfig = require('./grunt.conf.js');

module.exports = {
	entry: {
		app1: gruntConfig.browserEntry
	},
	output: {
		path: gruntConfig.assets,
        filename: '[name]/[hash:8].bundle.js',
        chunkFilename: '[name]/[id].[hash:8].common.js'
	},
	module: {
		loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel' // 'babel-loader' is also a legal name to reference
            }
		]
	}
};

