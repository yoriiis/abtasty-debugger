import DataManager from '../data-manager'
import fixturesAbtasty from '../../assets/fixtures/abtasty.json'

let dataManager
const testsSortedByStatus = {
	accepted: [fixturesAbtasty.results['000001']],
	rejected: [fixturesAbtasty.results['000002']]
}
const targetingsSortedByStatus = {
	'000001': {
		accepted: [],
		rejected: [fixturesAbtasty.results['000001'].targetings.targetPages.url_scope]
	},
	'000002': {
		accepted: [
			fixturesAbtasty.results['000002'].targetings.targetPages.url_scope,
			fixturesAbtasty.results['000002'].targetings.targetPages.code_scope,
			fixturesAbtasty.results['000002'].targetings.qaParameters.ip_scope
		],
		rejected: [
			fixturesAbtasty.results['000002'].targetings.targetPages.selector_scope,
			fixturesAbtasty.results['000002'].targetings.qaParameters.cookie_scope
		]
	}
}

const getInstance = () => new DataManager()

beforeEach(() => {
	dataManager = getInstance()
})

describe('Router getFormattedData', () => {
	it('Should call the getFormattedData function', () => {
		const result = dataManager.getFormattedData(fixturesAbtasty)

		expect(result).toStrictEqual({
			testsSortedByStatus: testsSortedByStatus,
			targetingsSortedByStatus: targetingsSortedByStatus
		})
	})
})

describe('Router getTestsSortedByStatus', () => {
	it('Should call the getTestsSortedByStatus function', () => {
		const result = dataManager.getTestsSortedByStatus(fixturesAbtasty)

		expect(result).toStrictEqual(testsSortedByStatus)
	})
})

describe('Router getTargetingsSortedByStatus', () => {
	it('Should call the getTargetingsSortedByStatus function', () => {
		const result = dataManager.getTargetingsSortedByStatus(fixturesAbtasty)

		expect(result).toStrictEqual(targetingsSortedByStatus)
	})
})
