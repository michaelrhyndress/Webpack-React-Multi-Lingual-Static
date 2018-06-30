var constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

//Common Config
module.exports = {
	target: 'web',
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
					loader: 'html-loader',
					options: {
						interpolate: 'require'
					}
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
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [constants.PATHS.style],
								sourceMap: false,
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
				use: [
					{
						loader: 'url-loader',
						query: {
							name: '[name].[hash].[ext]',
							limit: 10 * 1024
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								enabled: false,
								// NOTE: mozjpeg is disabled as it causes errors in some Linux environments
								// Try enabling it in your environment by switching the config to:
								// enabled: true,
								// progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4,
							},
						},
					},
				],
			}
		]
	},
	resolve: {
		modules: ['node_modules', 'index'],
		extensions: ['.js', '.jsx'],
		alias: {
			Styles: constants.PATHS.style,
			Scripts: constants.PATHS.script,
			Images: constants.PATHS.img
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		new ExtractTextPlugin({
			filename: '[name].css', //[name].[md5:contenthash:hex:20].css (hash added by HtmlWebpackPlugin)
			allChunks: true,
		}),
	],
}
