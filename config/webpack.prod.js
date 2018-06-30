//Config
const common = require('./webpack.common.js');
const helpers = require('./helpers');
const constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const merge = require('webpack-merge');

//Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = Object.keys(constants.LANGUAGES).map(function(language) {
	return merge(
		common, 
		{
			devtool: '(none)',
			mode: 'production',
			name: language,
			output: {
				path: constants.PATHS.dist,
				publicPath: "../",
				filename: language + '/[name].js', //[name]-[hash].js
				chunkFilename: language + '/[id].[chunkhash].js',
			},
			optimization: {
				minimize: true,
				nodeEnv: 'production',
				sideEffects: true,
				concatenateModules: true,
				runtimeChunk: true,
				splitChunks: {
					cacheGroups: {
						commons: {
							test: /[\\/]node_modules[\\/]/,
							name: 'vendors',
							chunks: 'all',
						},
					},
				},
				minimizer: [
					new UglifyJsPlugin({
						cache: true,
						parallel: true,
						sourceMap: false,
						uglifyOptions: {
							compress: {
								drop_console: true,
								drop_debugger: true,
							}
						}
					})
				]
			},
			performance: {
				assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
			},
			plugins: [
				new CleanWebpackPlugin([constants.PATHS.dist], {
					root: constants.ROOT
				}),
				new webpack.NoEmitOnErrorsPlugin(),
				new webpack.optimize.OccurrenceOrderPlugin(),
				new HtmlWebpackPlugin({
					filename: constants.PATH.join(language, 'index.html'),
					template: constants.PATH.join(constants.PATHS.template, "index.template.ejs"),
					// favicon: '',
					inject: true,
					sourceMap: false,
					chunksSortMode: 'dependency',
					minify: {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
					},
					hash: true, //Adds querystring to file
					vars: {
						language_direction: helpers.IsRightToLeft(language) ? "rtl" : "ltr",
						language: language,
						canonicalTags: Object.keys(constants.LANGUAGES).filter((key) => key !== language).map((key) => { return '<link rel="alternate" hreflang="' + key + '" href="' + constants.PATH.join('../', key, 'index.html') + '" />' })
					}
				}),
				new I18nPlugin(constants.LANGUAGES[language], {
					functionName: '__',
					failOnMissing: true,
					hideMessage: false
				}),
				new CompressionWebpackPlugin({
					asset: '[path].gz[query]',
					algorithm: 'gzip',
					threshold: 10240,
					minRatio: 0.8
				}),
				new OfflinePlugin({
					relativePaths: false,
					publicPath: '../',
					appShell: '../',
					excludes: ['.htaccess'],
					caches: 'all',
					responseStrategy: 'network-first',
					safeToUseOptionalCaches: true,
					ServiceWorker: {
						navigationPreload: true,
						events: true
					},
				}),
				new webpack.HashedModuleIdsPlugin({
					hashFunction: 'sha256',
					hashDigest: 'hex',
					hashDigestLength: 20,
				}),
			]
		}
	)
});
