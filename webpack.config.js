const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'
	const suffixHash = isProduction ? '.[contenthash]' : ''

	return {
		entry: {
			popup: './src/popup/config.js'
		},
		watch: !isProduction,
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: path.resolve(__dirname, './web/dist'),
			publicPath: 'dist/',
			filename: `scripts/[name]${suffixHash}.js`,
			chunkFilename: `scripts/[name]${suffixHash}.js`
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: path.resolve(__dirname, './src'),
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.css$/,
					include: [path.resolve(__dirname, './src')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, 'postcss.config.js')
								}
							}
						}
					]
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					include: [
						path.resolve(__dirname, './assets/'),
						path.resolve(__dirname, './src/')
					],
					type: 'asset/resource',
					generator: {
						filename: 'images/[name][ext]'
					}
				},
				{
					test: /\.(json)$/i,
					include: path.resolve(__dirname, './src/'),
					type: 'asset/resource',
					generator: {
						filename: '[name][ext]'
					}
				},
				{
					test: /\.svg$/,
					loader: 'svg-inline-loader'
				}
			]
		},
		resolve: {
			extensions: ['.js', '.css'],
			alias: {
				shared: path.resolve(__dirname, './src/shared'),
				globalAssets: path.resolve(__dirname, './assets')
			}
		},
		plugins: [
			new ProgressBarPlugin(),
			new MiniCssExtractPlugin({
				filename: `styles/[name]${suffixHash}.css`,
				chunkFilename: `styles/[name]${suffixHash}.css`
			}),
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: path.resolve(__dirname, './src/popup/views/popup.html'),
				publicPath: ''
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, './src/shared/static'),
						to: path.resolve(__dirname, './web/dist/static')
					},
					{
						from: path.resolve(__dirname, './src/shared/assets/manifest'),
						to: path.resolve(__dirname, './web/dist')
					},
					{
						from: path.resolve(__dirname, './src/shared/assets/service-worker'),
						to: path.resolve(__dirname, './web/dist')
					}
				]
			})
		],
		stats: {
			assets: true,
			colors: true,
			hash: false,
			timings: true,
			modules: false,
			entrypoints: false,
			excludeAssets: /.map$/,
			assetsSort: '!size'
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					extractComments: false
				}),
				new CssMinimizerPlugin()
			],
			chunkIds: 'deterministic', // or 'named'
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			providedExports: false,
			splitChunks: false
		}
	}
}
