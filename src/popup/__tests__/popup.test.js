import Popup from '../assets/scripts/popup'
import fixturesAbtasty from '../../shared/assets/fixtures/abtasty.json'

jest.mock('../components/list/assets/scripts/list')
jest.mock('../components/detail/assets/scripts/detail')
jest.mock('../../shared/assets/fixtures/abtasty.json')
jest.mock('../../shared/assets/svgs/arrow-bottom.svg')
jest.mock('shared/utils/data-manager')

let popup
const getInstance = () =>
	new Popup({
		data: fixturesAbtasty
	})

beforeEach(() => {
	popup = getInstance()
})

describe('Popup constructor', () => {
	it('Should initialize the constructor', () => {})
})
