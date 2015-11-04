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
				test: /\.gif/,
				loader: 'url-loader?limit=10000&mimetype=image/gif'
			},
			{
				test: /\.jpg/,
				loader: 'url-loader?limit=10000&mimetype=image/jpg'
			},
			{
				test: /\.png/,
				loader: 'url-loader?limit=10000&mimetype=image/png'
			},
			{
				test: /\.svg/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			},
			{
				test: /\.html/,
				exclude: [/node_modules/, /scripts/],
				loader: 'html-loader'
			}
		]
	}
};

