import fs from 'node:fs'
import path from 'node:path'
import CopyPlugin from 'copy-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
import fixturesAbtasty from '../src/shared/assets/fixtures/abtasty.json' with { type: 'json' }

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

dotenv.config({ path: resolveApp('.env') })

if (!process.env.SENTRY_DSN) {
	throw new Error('Environments variables are missing in .env ("SENTRY_DSN")')
}

export default function webpackConfig(env, argv) {
	const manifest = env.manifest
	const isProduction = argv.mode === 'production'
	const suffixHash = isProduction ? '.[contenthash]' : ''
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
			extensionAlias: {
				'.js': ['.ts', '.tsx', '.js']
			},
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
			}),
			new webpack.DefinePlugin({
				'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN)
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
			providedExports: true,
			splitChunks: false
		}
	}

	if (isProduction) {
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: resolveApp('src/popup/views/popup.html'),
				publicPath: '',
				chunks: ['popup']
			})
		)
	} else {
		config.plugins.push(new webpack.ProgressPlugin())

		if (env.WEBPACK_SERVE) {
			config.devServer = {
				static: {
					directory: resolveApp('web')
				},
				historyApiFallback: true,
				port: 3000,
				compress: true,
				hot: true
			}
		}

		config.entry.demo = resolveApp('src/demo/config')
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: resolveApp('src/demo/views/demo.html'),
				publicPath: '',
				chunks: ['demo'],
				templateParameters: {
					fixturesAbtasty: JSON.stringify(fixturesAbtasty)
				}
			})
		)
	}

	return config
}
