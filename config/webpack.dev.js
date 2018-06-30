//Config
var common = require('./webpack.common.js');
var helpers = require('./helpers');
var constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: "inline-sourcemap",
	name: constants.DEFAULT_LANGUAGE,
	output: {
		path: constants.PATHS.dist,
		publicPath: './',
		filename:  constants.PATH.join(constants.DEFAULT_LANGUAGE, "[name].js") //[name]-[hash].js (hash added by HtmlWebpackPlugin)
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: constants.PATH.join(constants.PATHS.template, "index.template.ejs"),
			inject: true,
			minify: {
				collapseWhitespace: true //minify
			},
			hash: true, //Adds querystring to file
			vars: {
				title: 'Static-multilingual',
				description: 'Static multi-lingual site scaffolding',
				keywords: 'key1,key2',
				language_direction: helpers.IsRightToLeft(constants.DEFAULT_LANGUAGE) ? "rtl" : "ltr",
				language: constants.DEFAULT_LANGUAGE
			}
		}),
		new I18nPlugin(constants.LANGUAGES[constants.DEFAULT_LANGUAGE], {
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
		contentBase: constants.PATHS.dist
	}
});