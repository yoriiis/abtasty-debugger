const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ChunksWebpackPlugin = require('chunks-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const SvgChunkWebpackPlugin = require('svg-chunk-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'
	const suffixHash = isProduction ? '.[contenthash]' : ''
	const splitChunks = {
		chunks: 'all',
		minSize: 0
	}

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
					include: path.resolve(__dirname, './src/'),
					type: 'asset/resource',
					generator: {
						filename: `images/[name]${suffixHash}[ext]`
					}
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: SvgChunkWebpackPlugin.loader
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.css'],
			alias: {
				shared: path.resolve(__dirname, './src/shared')
			}
		},
		plugins: [
			new ProgressBarPlugin(),
			new WebpackManifestPlugin(),
			new MiniCssExtractPlugin({
				filename: `styles/[name]${suffixHash}.css`,
				chunkFilename: `styles/[name]${suffixHash}.css`
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new ChunksWebpackPlugin({
				filename: 'templates/[name]-[type].html',
				templateScript: '<script defer src="{{chunk}}"></script>'
			}),
			new SvgChunkWebpackPlugin({
				filename: `sprites/[name]${suffixHash}.svg`
			})
		],
		stats: {
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
			splitChunks: isProduction ? splitChunks : false
		}
	}
}
