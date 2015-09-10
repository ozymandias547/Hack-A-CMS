/**
 * Bundle module dependencies.
 */

'use strict';

var webpack = require('webpack');
var	ExtractTextPlugin = require('extract-text-webpack-plugin');
var	webpackConfig = require('../config/webpack.conf.js');
var	paths = require('../config/paths');
var environmentConfig = require('../../src/config/configLoader');

module.exports = {
	"webpack-dev-server": {
		options: {
			webpack: webpackConfig,
			port: environmentConfig.devServer.port
		},
		start: {
			keepAlive: true,
			webpack: {
				devtool: 'sourcemap',
				debug: true,
				cache: true,
				output: {
					filename: '[name]/bundle.js',
					chunkFilename: '[name]/[id].common.js',
					publicPath: 'http://localhost:8090/'
				},
				module: {
					loaders: [
						{
							test: /\.scss$/,
							loader: ExtractTextPlugin.extract('css?sourceMap!ruby-sass?outputStyle=expanded&compass&' +
							'requires[]=susy&requires[]=normalize-skin&' +
							'includePaths[]=' + paths.scss.path)
						}
					]
				},
				plugins: [
					new ExtractTextPlugin('[name]/compiled.css'),
					new webpack.ProvidePlugin({
						_: 'underscore'
					})
				]
			}
		}
	}
};
