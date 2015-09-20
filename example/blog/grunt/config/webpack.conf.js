/**
 * Webpack bundler configuration.
 */

'use strict';

var _ = require('lodash');
var	path = require('path');
var	webpack = require('webpack');
var	paths = require('paths');
var environmentConfig = require('../../src/config/configLoader.js');

var config = {

	entry: {
		home: path.normalize(paths.templatePath + '/home.js')
	},

	output: {
		path: paths.distPublicPath,
		publicPath: environmentConfig.assets + '/public/'
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
	},
	plugins: [
		new webpack.ProvidePlugin({
			_: 'underscore'
		})
	]
};

module.exports = config;
