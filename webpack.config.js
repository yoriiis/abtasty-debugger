const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const target = env.target
	const isProduction = argv.mode === 'production'
	const suffixHash = isProduction ? '.[contenthash]' : ''
	const isReleaseMode = env.release || false
	const manifestFilename = target === 'chrome' ? 'manifest-v3.json' : 'manifest-v2.json'

	const entries = {
		popup: ['./src/popup/config']
	}
	const plugins = [
		new ProgressBarPlugin(),
		new MiniCssExtractPlugin({
			filename: `styles/[name]${suffixHash}.css`,
			chunkFilename: `styles/[name]${suffixHash}.css`
		}),
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			template: path.resolve(__dirname, './src/popup/views/popup.html'),
			publicPath: '',
			chunks: ['popup']
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/shared/assets/content-scripts'),
					to: path.resolve(__dirname, './web/dist/scripts')
				},
				{
					from: path.resolve(
						__dirname,
						`./src/shared/assets/manifests/${manifestFilename}`
					),
					to: path.resolve(__dirname, './web/dist/manifest.json')
				},
				{
					from: path.resolve(__dirname, './src/shared/assets/background'),
					to: path.resolve(__dirname, './web/dist/')
				}
			]
		})
	]

	// On release mode disabled, add the debug entry point and plugin
	if (!isReleaseMode) {
		entries['popup-debug'] = './src/popup-debug/config'
		plugins.push(
			new HtmlWebpackPlugin({
				filename: 'popup-debug.html',
				template: path.resolve(__dirname, './src/popup/views/popup.html'),
				publicPath: '',
				chunks: ['popup-debug']
			})
		)
	}

	return {
		entry: entries,
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
					test: /\.(js)$/,
					include: path.resolve(__dirname, './src'),
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.(ts|tsx)$/,
					include: path.resolve(__dirname, './src'),
					use: [
						{
							loader: 'babel-loader'
						},
						{
							loader: 'ts-loader'
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
					test: /\.(json|svg)$/i,
					include: path.resolve(__dirname, './src/'),
					type: 'asset/source',
					generator: {
						filename: '[name][ext]'
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.ts', '.tsx', '.css'],
			alias: {
				shared: path.resolve(__dirname, './src/shared'),
				globalAssets: path.resolve(__dirname, './assets')
			}
		},
		plugins,
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
					extractComments: false,
					parallel: true,
					terserOptions: {
						compress: {
							// Drop console.log|console.info|console.debug
							// Keep console.warn|console.error
							pure_funcs: ['console.log', 'console.info', 'console.debug']
						},
						mangle: true
					}
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
