import DataManager from '../data-manager'
import fixturesAbtasty from '../../assets/fixtures/abtasty.json'

let dataManager
const testsSortedByStatus = {
	accepted: [fixturesAbtasty.results[100002]],
	rejected: [fixturesAbtasty.results[100001], fixturesAbtasty.results[100004]]
}
const targetingsSortedByStatus = {
	100001: {
		accepted: [],
		rejected: [fixturesAbtasty.results[100001].targetings.targetPages.url_scope]
	},
	100002: {
		accepted: [
			fixturesAbtasty.results[100002].targetings.targetPages.code_scope,
			fixturesAbtasty.results[100002].targetings.targetPages.selector_scope,
			fixturesAbtasty.results[100002].targetings.targetPages.url_scope,
			fixturesAbtasty.results[100002].targetings.qaParameters.cookie_scope,
			fixturesAbtasty.results[100002].targetings.qaParameters.ip_scope
		],
		rejected: []
	},
	100003: {
		accepted: [],
		rejected: []
	},
	100004: {
		accepted: [
			fixturesAbtasty.results[100004].targetings.targetPages.selector_scope,
			fixturesAbtasty.results[100004].targetings.targetPages.url_scope
		],
		rejected: [fixturesAbtasty.results[100004].targetings.targetPages.code_scope]
	}
}

const getInstance = () => new DataManager()

beforeEach(() => {
	dataManager = getInstance()
})

describe('DataManager getFormattedData', () => {
	it('Should call the getFormattedData function', () => {
		const result = dataManager.getFormattedData(fixturesAbtasty)

		expect(result).toStrictEqual({
			testsSortedByStatus: testsSortedByStatus,
			targetingsSortedByStatus: targetingsSortedByStatus
		})
	})
})

describe('DataManager getTestsSortedByStatus', () => {
	it('Should call the getTestsSortedByStatus function', () => {
		const result = dataManager.getTestsSortedByStatus(fixturesAbtasty)

		expect(result).toStrictEqual(testsSortedByStatus)
	})
})

describe('DataManager getTargetingsSortedByStatus', () => {
	it('Should call the getTargetingsSortedByStatus function', () => {
		const result = dataManager.getTargetingsSortedByStatus(fixturesAbtasty)

		expect(result).toStrictEqual(targetingsSortedByStatus)
	})
})
