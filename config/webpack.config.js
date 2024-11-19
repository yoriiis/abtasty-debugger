const fs = require('node:fs')
const path = require('node:path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = (env, argv) => {
	const manifest = env.manifest
	const isProduction = argv.mode === 'production'
	const suffixHash = isProduction ? '.[contenthash]' : ''
	const isReleaseMode = env.release || false
	const manifestFilename = manifest === 'v3' ? 'manifest-v3.json' : 'manifest-v2.json'

	const config = {
		entry: {
			popup: resolveApp('src/popup/config')
		},
		context: appDirectory,
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: resolveApp('web'),
			publicPath: '/',
			filename: `scripts/[name]${suffixHash}.js`,
			chunkFilename: `scripts/[name]${suffixHash}.js`
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					include: resolveApp('src'),
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.(ts|tsx)$/,
					include: resolveApp('src'),
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
					include: [resolveApp('src')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: resolveApp('config/postcss.config.js')
								}
							}
						}
					]
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					include: [resolveApp('assets'), resolveApp('src')],
					type: 'asset/resource',
					generator: {
						filename: 'images/[name][ext]'
					}
				},
				{
					test: /\.(json|svg)$/i,
					include: resolveApp('src'),
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
				shared: resolveApp('src/shared'),
				globalAssets: resolveApp('assets')
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: `styles/[name]${suffixHash}.css`,
				chunkFilename: `styles/[name]${suffixHash}.css`
			}),
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: resolveApp('src/popup/views/popup.html'),
				publicPath: '',
				chunks: ['popup']
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new CopyPlugin({
				patterns: [
					{
						from: resolveApp('src/shared/assets/content-scripts'),
						to: resolveApp('web/scripts')
					},
					{
						from: resolveApp(`src/shared/assets/manifests/${manifestFilename}`),
						to: resolveApp('web/manifest.json')
					},
					{
						from: resolveApp('src/shared/assets/background'),
						to: resolveApp('web/')
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

	if (!isProduction) {
		config.plugins.push(new webpack.ProgressPlugin())

		if (env.WEBPACK_SERVE) {
			config.devServer = {
				static: {
					directory: resolveApp('web')
				},
				historyApiFallback: true,
				port: 3000,
				compress: true,
				hot: true,
				open: ['popup-debug.html']
			}
		}
	}

	// On release mode disabled, add the debug entry point and plugin
	if (!isReleaseMode) {
		config.entry['popup-debug'] = resolveApp('src/popup-debug/config')
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: resolveApp('src/popup/views/popup.html'),
				publicPath: '',
				chunks: ['popup-debug']
			})
		)
	}

	return config
}
