module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true,
			jsx: true
		},
		babelOptions: { configFile: './config/babel.config.js' },
		sourceType: 'module'
	},

	env: {
		browser: true,
		node: true,
		jest: true
	},

	extends: [
		'standard',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['@typescript-eslint'],

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'] }],
		'no-tabs': 0,
		'multiline-ternary': 0,
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
		],
		'react/prop-types': 0,
		'react/display-name': 0,
		'react/jsx-key': 0,
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'react/no-unknown-property': ['error', { ignore: ['innerHTML'] }],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off'
	},

	globals: {
		document: false,
		window: false,
		chrome: true,
		browser: true,
		ABTasty: true
	},

	settings: {
		react: {
			version: '0' // Remove the warning of the missing React package
		}
	},

	ignorePatterns: ['node_modules', 'web', 'lib']
}
