import DataManager from '../data-manager'
import fixturesAbtasty from '../../assets/fixtures/abtasty.json'

let dataManager
const testsSortedByStatus = {
	accepted: [fixturesAbtasty.results[900001]],
	rejected: [fixturesAbtasty.results[900002], fixturesAbtasty.results[900004]]
}
const targetingsSortedByStatus = {
	900001: {
		accepted: [],
		rejected: [fixturesAbtasty.results[900001].targetings.targetPages.url_scope]
	},
	900002: {
		accepted: [
			fixturesAbtasty.results[900002].targetings.targetPages.url_scope,
			fixturesAbtasty.results[900002].targetings.targetPages.code_scope,
			fixturesAbtasty.results[900002].targetings.qaParameters.ip_scope
		],
		rejected: [
			fixturesAbtasty.results[900002].targetings.targetPages.selector_scope,
			fixturesAbtasty.results[900002].targetings.qaParameters.cookie_scope
		]
	},
	900003: {
		accepted: [],
		rejected: []
	},
	900004: {
		accepted: [
			fixturesAbtasty.results[900004].targetings.targetPages.url_scope,
			fixturesAbtasty.results[900004].targetings.targetPages.code_scope
		],
		rejected: [fixturesAbtasty.results[900004].targetings.targetPages.selector_scope]
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
