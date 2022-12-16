module.exports = {
	parser: '@babel/eslint-parser',
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

	extends: ['standard', 'plugin:react/recommended', 'plugin:prettier/recommended'],

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
		'react/jsx-key': 0
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
			pragma: 'createElement',
			fragment: 'Fragment',
			version: '0' // Remove the warning of the missing React package
		}
	}
}
