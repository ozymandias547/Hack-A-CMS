/**
 * Bundle module dependencies.
 */

'use strict';

var webpack = require('webpack');
//var	ExtractTextPlugin = require('extract-text-webpack-plugin');
var paths = require('../../config/grunt.conf.js');
//var	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	webpack: {
		options: require('../../config/webpack.conf.js'),
		'build-prod': {
			output: {
				filename: '[name]/[hash:8].bundle.js',
				chunkFilename: '[name]/[id].[hash:8].common.js'
			},
			module: {
				//loaders: [
				//	{
				//		test: /\.scss$/,
				//		loader: ExtractTextPlugin.extract('css?sourceMap&-minimize!ruby-sass?outputStyle=compressed&compass&' +
				//										   'requires[]=susy&requires[]=normalize-skin&' +
				//										   'includePaths[]=' + paths.scss.path)
				//	}
				//]
			},
			plugins: [
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.UglifyJsPlugin(),
				new webpack.optimize.AggressiveMergingPlugin(),
				//new ExtractTextPlugin('[name]/compiled.[contenthash:8].css'),
				new webpack.ProvidePlugin({
					_: 'underscore'
				})
				//new HtmlWebpackPlugin({
				//	chunks: ['mobile'],
				//	filename: 'mobile/component/includes/js-include.html',
				//	templateContent: '<script src="{%= o.htmlWebpackPlugin.files.js %}"></script>'
				//}),
				//new HtmlWebpackPlugin({
				//	chunks: ['mobile'],
				//	filename: 'mobile/component/includes/css-include.html',
				//	templateContent: '<link href="{%= o.htmlWebpackPlugin.files.css %}" rel="stylesheet">'
				//})
			],
			stats: {
				colors: true,
				reasons: true
			},
			cache: false,
			debug: false
		},
		'build-dev': {
			devtool: 'sourcemap',
			debug: true,
			cache: true,
			output: {
				filename: '[name]/[hash:8].bundle.js',
				chunkFilename: '[name]/[id].[hash:8].common.js'
			},
			plugins: [
				//new ExtractTextPlugin('[name]/[hash:8].compiled.css'),
				new webpack.ProvidePlugin({
					_: 'underscore'
				})
			]
		}
	}
};
