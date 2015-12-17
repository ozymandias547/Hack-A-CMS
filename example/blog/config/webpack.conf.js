'use strict';

var	webpack = require('webpack');
var	gruntConfig = require('./grunt.conf.js');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: gruntConfig.srcPath,
    entry: {
		moxiapp: gruntConfig.browserEntry
	},
	output: {
		path: gruntConfig.assets,
        filename: '[name]/[hash:8].bundle.js',
        chunkFilename: '[name]/[id].[hash:8].common.js'
	},
    devtool: 'source-map',
    resolveLoader: {
        modulesDirectories: [
            path.join(__dirname, "..", "node_modules")
        ]
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json']
    },
	module: {
		loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                    //["style", "css", "sass"]
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets:['react']
                }
            }
		]
	},
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.IgnorePlugin(new RegExp("^(request)$"))
    ]
};

