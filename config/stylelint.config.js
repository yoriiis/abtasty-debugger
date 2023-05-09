module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	rules: {
		'unit-allowed-list': ['em', 'rem', '%', 'px', 's', 'deg', 'fr', 'vh', 'vw', 'ms'],
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null,
		'property-no-vendor-prefix': null,
		'selector-class-pattern': null,
		'custom-property-pattern': null,
		'no-irregular-whitespace': null
	}
}
