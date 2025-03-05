export default {
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'svg'],
	modulePaths: ['<rootDir>/src'],
	preset: 'ts-jest/presets/js-with-babel',
	resetModules: true,
	verbose: true,
	coverageDirectory: 'coverage',
	rootDir: '../',
	transform: {
		'^.+\\.(ts|tsx|js)$': 'ts-jest',
		'^.+\\.svg$': 'jest-transform-stub'
	},
	moduleNameMapper: {
		'(.+)\\.js': '$1'
	},
	testEnvironment: 'jsdom',
	resetMocks: true,
	clearMocks: true
}
