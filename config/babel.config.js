/**
 * Generate Babel config
 * @param {object} api Babel API data
 * @returns {object} Babel config
 */
export default function babelConfig(api) {
	api.cache(true)
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					// Target esmodules browsers instead of browsers list
					targets: {
						esmodules: true
					}
				}
			],
			'@babel/preset-typescript',
			[
				'@babel/preset-react',
				{
					runtime: 'automatic',
					importSource: 'jsx-dom'
				}
			]
		],
		plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
	}
}
