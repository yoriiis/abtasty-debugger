import DataManager from '../data-manager'
import fixturesAbtasty from '../../assets/fixtures/abtasty.json'

let dataManager
const getInstance = () => new DataManager()

beforeEach(() => {
	dataManager = getInstance()
})

describe('Router getTestsSortedByStatus', () => {
	it('Should call the getTestsSortedByStatus function', () => {
		const result = dataManager.getTestsSortedByStatus(fixturesAbtasty)

		expect(result).toStrictEqual({
			accepted: [fixturesAbtasty.results['000001']],
			rejected: [fixturesAbtasty.results['000002']]
		})
	})
})

describe('Router getTargetingsSortedByStatus', () => {
	it('Should call the getTargetingsSortedByStatus function', () => {
		const result = dataManager.getTargetingsSortedByStatus(fixturesAbtasty)

		expect(result).toStrictEqual({
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
		})
	})
})
