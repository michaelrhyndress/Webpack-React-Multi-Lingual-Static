var constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
//const OfflinePlugin = require('offline-plugin');

//Common Config
module.exports = {
	entry: {
		index: constants.PATH.join(constants.PATHS.script, "index.js")
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets:['es2017']
				}
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader?interpolate=require'
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								minimize: {
									discardComments: {
										removeAll: true
									}
								}
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [autoprefixer('last 2 version')],
								sourceMap: false
							}
						}
					]
				}),
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: {
									discardComments: {
										removeAll: true
									}
								}
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [autoprefixer('last 2 version')],
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [constants.PATHS.style],
								sourceMap: true,
								minimize: {
									discardComments: {
										removeAll: true
									}
								}
							}
						}
					]
				}),
			},
			{
				test: /\.(ttf|eot|ico|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // FONTS
				loader: 'file-loader',
				query: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.(webm|mp4)$/, // Video
				loader: 'file-loader',
				query: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/, //image
				loader: 'url-loader',
				query: {
					name: '[name].[hash].[ext]',
					limit: 8192
				}
			}
		]
	},
	resolve: {
		modules: ['node_modules', 'styles'],
		extensions: ['.js', '.jsx'],
		alias: {
			Styles: constants.PATHS.style,
			Scripts: constants.PATHS.script,
			Images: constants.PATHS.img
		}
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css', //[name].[md5:contenthash:hex:20].css (hash added by HtmlWebpackPlugin)
			allChunks: false,
		}),
	]
}
