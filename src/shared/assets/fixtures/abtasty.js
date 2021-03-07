export default {
	accountData: {
		accountSettings: {
			id: 123456,
			identifier: '8e04732adf',
			accountName: 'ABTasty',
			region: 'europe',
			frameworkVersion: 'latest'
		},
		tests: {
			'000001': {
				id: '000001',
				name: 'Test with the menu button on the left',
				type: 'ab',
				targetingMode: 'waituntil',
				status: 'target_pages_rejected',
				scopes: {
					urlScope: [
						{
							include: true,
							condition: 10,
							value: 'https://www.google.fr'
						}
					],
					codeScope: [],
					selectorScope: [],
					cookieScope: [],
					ipScope: [],
					favoriteUrlScopeConditions: [],
					favoriteUrlScope: []
				},
				actionTrackings: {},
				variations: {}
			},
			'000002': {
				id: '000002',
				name: 'Test with darkmode sticky banner on the header',
				type: 'ab',
				targetingMode: 'fastest',
				status: 'rejected',
				scopes: {
					urlScope: [
						{
							include: false,
							condition: 10,
							value: 'https://www.google.fr'
						},
						{
							include: true,
							condition: 11,
							value: 'https://www.google.fr/news'
						}
					],
					codeScope: [
						{
							value:
								'var hourStart = 18;\nvar hourEnd = 4;\nvar hourGranted = new Date().getHours() >= hourStart || new Date().getHours() <= hourEnd;\n\nif (hourGranted) {\n    return true;\n} else {\n    return false;\n}'
						}
					],
					selectorScope: [
						{
							include: true,
							condition: 44,
							value: '.header'
						}
					],
					cookieScope: [
						{
							include: true,
							value: 'true',
							name: 'sampleCookie'
						}
					],
					ipScope: [
						{
							include: true
						}
					],
					favoriteUrlScopeConditions: [],
					favoriteUrlScope: []
				},
				actionTrackings: {
					click: [
						{
							name: 'click on darkmode',
							selector: 'html:not(.darkMode) .button'
						},
						{
							name: 'click off darkmode',
							selector: 'html.darkMode .button'
						}
					]
				},
				variations: {
					'001001': {
						id: '001001',
						name: 'header-darkmode-cta'
					},
					'001002': {
						id: '001002',
						name: 'header-darkmode-slider'
					}
				}
			}
		}
	},
	results: {
		'000001': {
			name: 'Test with the menu button on the left',
			type: 'ab',
			status: 'target_pages_rejected',
			variationID: null,
			variationName: null,
			targetings: {
				targetPages: {
					url_scope: {
						conditions: [
							{
								include: true,
								condition: 10,
								value: 'https://www.google.fr'
							}
						],
						success: false
					}
				},
				qaParameters: {}
			}
		},
		'000002': {
			name: 'Test with darkmode sticky banner on the header',
			type: 'ab',
			status: 'rejected',
			variationID: '001001',
			variationName: 'header-darkmode-cta',
			targetings: {
				targetPages: {
					url_scope: {
						conditions: [
							{
								include: false,
								condition: 10,
								value: 'https://www.google.fr'
							},
							{
								include: true,
								condition: 11,
								value: 'https://www.google.fr/news'
							}
						],
						success: true
					},
					code_scope: {
						conditions: [
							{
								value:
									'var hourStart = 18;\nvar hourEnd = 4;\nvar hourGranted = new Date().getHours() >= hourStart || new Date().getHours() <= hourEnd;\n\nif (hourGranted) {\n    return true;\n} else {\n    return false;\n}'
							}
						],
						success: true
					},
					selector_scope: {
						conditions: [
							{
								include: true,
								condition: 44,
								value: '.header'
							}
						],
						success: false
					}
				},
				qaParameters: {
					cookie_scope: {
						conditions: [
							{
								include: false,
								value: 'true',
								name: 'sampleCookie'
							}
						],
						success: false
					},
					ip_scope: {
						conditions: [
							{
								include: true,
								to: 0,
								range: false,
								from: '1555592406'
							}
						],
						success: true
					}
				}
			}
		}
	},
	visitor: {
		id: 'f7c3bc1d80'
	}
}
