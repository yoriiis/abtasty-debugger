import fixturesAbtasty from '../../assets/fixtures/abtasty.json'
import DataManager from '../data-manager.js'

let dataManager
const testsSortedByStatus = {
	accepted: [fixturesAbtasty.results[100002]],
	rejected: [fixturesAbtasty.results[100001], fixturesAbtasty.results[100004]]
}
const targetingsSortedByStatus = {
	100001: {
		accepted: [
			{
				...fixturesAbtasty.results[100001].targetings.trigger[0],
				...{ key: 'trigger' }
			},
			{
				...fixturesAbtasty.results[100001].targetings.trigger[2],
				...{ key: 'trigger' }
			}
		],
		rejected: [
			{
				...fixturesAbtasty.results[100001].targetings.targetPages.url_scope,
				...{ key: 'url_scope' }
			},
			{
				...fixturesAbtasty.results[100001].targetings.segment[0],
				...{ key: 'segment' }
			},
			{
				...fixturesAbtasty.results[100001].targetings.trigger[1],
				...{ key: 'trigger' }
			}
		]
	},
	100002: {
		accepted: [
			{
				...fixturesAbtasty.results[100002].targetings.targetPages.code_scope,
				...{ key: 'code_scope' }
			},
			{
				...fixturesAbtasty.results[100002].targetings.targetPages.selector_scope,
				...{ key: 'selector_scope' }
			},
			{
				...fixturesAbtasty.results[100002].targetings.targetPages.favorite_url_scope,
				...{ key: 'favorite_url_scope' }
			},
			{
				...fixturesAbtasty.results[100002].targetings.qaParameters.cookie_scope,
				...{ key: 'cookie_scope' }
			},
			{
				...fixturesAbtasty.results[100002].targetings.qaParameters.ip_scope,
				...{ key: 'ip_scope' }
			},
			{
				...fixturesAbtasty.results[100002].targetings.qaParameters.qa_url_parameter_enabled,
				...{ key: 'qa_url_parameter_enabled' }
			}
		],
		rejected: []
	},
	100003: {
		accepted: [],
		rejected: [
			{
				...fixturesAbtasty.results[100003].targetings.qaParameters.ip_scope,
				...{ key: 'ip_scope' }
			}
		]
	},
	100004: {
		accepted: [
			{
				...fixturesAbtasty.results[100004].targetings.targetPages.selector_scope,
				...{ key: 'selector_scope' }
			},
			{
				...fixturesAbtasty.results[100004].targetings.targetPages.url_scope,
				...{ key: 'url_scope' }
			}
		],
		rejected: [
			{
				...fixturesAbtasty.results[100004].targetings.targetPages.code_scope,
				...{ key: 'code_scope' }
			}
		]
	}
}

const getInstance = () => new DataManager()

beforeEach(() => {
	dataManager = getInstance()
})

describe('DataManager', () => {
	describe(' getTestsSortedByStatus', () => {
		it('Should call the getTestsSortedByStatus function', () => {
			const result = dataManager.getTestsSortedByStatus(fixturesAbtasty)

			expect(result).toStrictEqual(testsSortedByStatus)
		})
	})

	describe(' getTargetingsSortedByStatus', () => {
		it('Should call the getTargetingsSortedByStatus function', () => {
			const result = dataManager.getTargetingsSortedByStatus(fixturesAbtasty)

			expect(result).toStrictEqual(targetingsSortedByStatus)
		})
	})
})
