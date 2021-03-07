module.exports = {
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'svg'],
	modulePaths: ['./src'],
	preset: 'ts-jest/presets/js-with-babel',
	resetModules: true,
	verbose: true,
	transform: {
		'^.+\\.(ts|tsx|js)$': 'ts-jest',
		'^.+\\.svg$': 'jest-transform-stub'
	}
}
