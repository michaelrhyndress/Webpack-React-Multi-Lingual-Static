//Config
var common = require('./webpack.common.js');
var helpers = require('./helpers');
var constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const merge = require('webpack-merge')
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.keys(constants.LANGUAGES).map(function(language) {
	return merge(common, {
		mode: 'development',
		devtool: "inline-sourcemap",
		name: language,
		output: {
			path: constants.PATHS.dist,
			publicPath: "../",
			filename: constants.PATH.join(language, '[name].js'), //[name]-[hash].js
			chunkFilename: constants.PATH.join(language, '[id].[chunkhash].js'),
		},
		optimization: {
		    minimize: false,
		},
		performance: {
			hints: "warning",
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				filename: constants.PATH.join(language, 'index.html'),
				template: constants.PATH.join(constants.PATHS.template, "index.template.ejs"),
				inject: true,
				hash: true, //Adds querystring to file
				vars: {
					language_direction: helpers.IsRightToLeft(language) ? "rtl" : "ltr",
					language: language,
					canonicalTags: Object.keys(constants.LANGUAGES).filter((key) => key !== language).map((key) => { return '<link rel="alternate" hreflang="' + key + '" href="' + constants.PATH.join('../', key, 'index.html') + '" />' })
				}
			}),
			// new CircularDependencyPlugin({
			// 	exclude: /a\.js|node_modules/, // exclude node_modules
			// 	failOnError: false, // show a warning when there is a circular dependency
			// }),
			new I18nPlugin(constants.LANGUAGES[language], {
				functionName: '__',
				failOnMissing: true,
				hideMessage: false
			})
		],
		devServer: {
			host: 'localhost',
			port: '8080',
			historyApiFallback: true,
			inline: true,
			hot: true,
			contentBase: constants.PATHS.dist,
			publicPath: "/",
		}
	});
});