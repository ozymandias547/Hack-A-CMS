/**
 * Webpack bundler configuration.
 */

'use strict';

var	webpack = require('webpack');
var	paths = require('./grunt.conf.js');

var config = {

	entry: {
		public: paths.webpackEntry
	},

	output: {
		path: paths.dist,
		publicPath: '/public/'
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

module.exports = config;
