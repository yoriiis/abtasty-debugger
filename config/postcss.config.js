import crypto from 'node:crypto'

const md5 = (string) => crypto.createHash('md5').update(string).digest('hex')

export default function postCssConfig(api) {
	const isProduction = api.mode === 'production'

	return {
		plugins: [
			'postcss-import',
			'postcss-url',
			'postcss-nested',
			[
				'postcss-custom-properties-transformer',
				{
					transformer: ({ property }) => (isProduction ? md5(property).slice(0, 4) : property)
				}
			],
			[
				'postcss-preset-env',
				{
					stage: 2,
					features: {
						'nesting-rules': false
					}
				}
			],
			[
				'postcss-custom-media',
				{
					preserve: false
				}
			]
		]
	}
}
