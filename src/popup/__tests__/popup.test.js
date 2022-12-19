import { createElement } from 'jsx-dom'
import Popup from '../assets/scripts/popup'
import fixturesAbtasty from '../../shared/assets/fixtures/abtasty.json'
import DataManager from 'shared/utils/data-manager'
import { namespace } from 'shared/utils/bridge'
import { App, navigate } from 'costro'
import List from '../components/list/assets/scripts/list'
import Detail from '../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'

jest.mock('shared/utils/data-manager')
jest.mock('shared/utils/bridge', () => {
	return {
		namespace: {
			tabs: {
				onUpdated: {
					addListener: jest.fn()
				}
			}
		},
		isExtensionMode: true
	}
})
jest.mock('costro', () => {
	const originalModule = jest.requireActual('costro')
	return {
		...originalModule,
		App: jest.fn().mockImplementation(() => {
			return {
				location: {
					currentPath: '/'
				}
			}
		}),
		navigate: jest.fn()
	}
})
jest.mock('../components/list/assets/scripts/list')
jest.mock('../components/detail/assets/scripts/detail')
jest.mock('shared/empty/assets/scripts/empty')

let popup

const getInstance = () =>
	new Popup({
		data: { ...fixturesAbtasty } // Clone the object to prevent conflict between tests with object reference
	})

beforeEach(() => {
	document.body.append(<div id="app"></div>)

	Object.defineProperty(window, 'location', {
		writable: true,
		value: {
			reload: jest.fn()
		}
	})
	Object.defineProperty(window, 'close', {
		writable: true,
		value: jest.fn()
	})

	popup = getInstance()
})

afterEach(() => {
	document.body.innerHTML = ''
	jest.clearAllMocks()
})

describe('Popup', () => {
	describe('Popup constructor', () => {
		it('Should initialize the constructor', () => {
			expect(popup.data).toStrictEqual(fixturesAbtasty)
			expect(popup.element).toBe(document.getElementById('app'))
			expect(DataManager).toHaveBeenCalled()
		})
	})

	describe('Popup init', () => {
		beforeEach(() => {
			popup.dataManager.getTestsSortedByStatus = jest
				.fn()
				.mockReturnValue({ accepted: [], rejected: [] })

			popup.dataManager.getTargetingsSortedByStatus = jest
				.fn()
				.mockReturnValue({ 100001: { accepted: [], rejected: [] } })
			popup.setRedirection = jest.fn()
			popup.addEvents = jest.fn()
		})

		afterEach(() => {
			expect(popup.setRedirection).toHaveBeenCalled()
			expect(popup.addEvents).toHaveBeenCalled()
		})

		it('Should call the init function', () => {
			popup.init()

			expect(App).toHaveBeenCalledWith({
				target: document.getElementById('app'),
				routes: [
					{
						path: '/list',
						component: List,
						props: {
							hasData: true,
							data: fixturesAbtasty,
							dataManager: popup.dataManager
						}
					},
					{
						path: '/detail/:testId',
						component: Detail,
						props: {
							hasData: true,
							data: fixturesAbtasty,
							dataManager: popup.dataManager
						}
					},
					{
						path: '/empty',
						component: Empty,
						props: {
							hasData: true
						}
					}
				]
			})
		})

		it('Should call the init function without data', () => {
			popup.data = undefined

			popup.init()

			expect(App).toHaveBeenCalledWith({
				target: document.getElementById('app'),
				routes: [
					{
						path: '/list',
						component: List,
						props: {
							hasData: false,
							data: undefined,
							dataManager: popup.dataManager
						}
					},
					{
						path: '/detail/:testId',
						component: Detail,
						props: {
							hasData: false,
							data: undefined,
							dataManager: popup.dataManager
						}
					},
					{
						path: '/empty',
						component: Empty,
						props: {
							hasData: false
						}
					}
				]
			})
		})

		it('Should call the init function without results inside data', () => {
			popup.data.results = null

			popup.init()

			expect(App).toHaveBeenCalledWith({
				target: document.getElementById('app'),
				routes: [
					{
						path: '/list',
						component: List,
						props: {
							hasData: false,
							data: popup.data,
							dataManager: popup.dataManager
						}
					},
					{
						path: '/detail/:testId',
						component: Detail,
						props: {
							hasData: false,
							data: popup.data,
							dataManager: popup.dataManager
						}
					},
					{
						path: '/empty',
						component: Empty,
						props: {
							hasData: false
						}
					}
				]
			})
		})
	})

	describe('isEmpty', () => {
		it('Should call the isEmpty function with no data', () => {
			popup.data = null
			const result = popup.isEmpty()

			expect(result).toBe(true)
		})

		it('Should call the isEmpty function with no results key inside data', () => {
			delete popup.data.results
			const result = popup.isEmpty()

			expect(result).toBe(true)
		})

		it('Should call the isEmpty function with no results inside data', () => {
			popup.data.results = null
			const result = popup.isEmpty()

			expect(result).toBe(true)
		})

		it('Should call the isEmpty function with all valid fields', () => {
			const result = popup.isEmpty()

			expect(result).toBe(false)
		})
	})

	describe('Popup setRedirection', () => {
		it('Should call the setRedirection function with no data', () => {
			popup.redirectToEmpty = true

			popup.setRedirection()

			expect(navigate).toHaveBeenCalledWith('/empty')
		})

		it('Should call the setRedirection function with data and redirect to list from /', () => {
			popup.app = {
				location: {
					currentPath: '/'
				}
			}

			popup.setRedirection()

			expect(navigate).toHaveBeenCalledWith('/list')
		})

		it('Should call the setRedirection function with data and redirect to list from /empty', () => {
			popup.app = {
				location: {
					currentPath: '/empty'
				}
			}

			popup.setRedirection()

			expect(navigate).toHaveBeenCalledWith('/list')
		})

		it('Should call the setRedirection function with data and no redirect to list from /detail/100001', () => {
			popup.app = {
				location: {
					currentPath: '/detail/100001'
				}
			}

			popup.setRedirection()

			expect(navigate).not.toHaveBeenCalled()
		})
	})

	describe('Popup addEvents', () => {
		it('Should call the addEvents function', () => {
			popup.addEvents()

			expect(namespace.tabs.onUpdated.addListener).toHaveBeenCalledWith(popup.onTabUpdated)
		})
	})

	describe('Popup onTabUpdated', () => {
		beforeEach(() => {
			document.body.append(
				<input
					type="checkbox"
					value="false"
					className="customCheckbox-input"
					id="debugMode"
					name="debug"
				/>
			)
		})

		it('Should call the onTabUpdated function with the debug buton disabled and the loading complete', () => {
			const debugMode = document.querySelector('#debugMode')
			debugMode.setAttribute('disabled', '')

			debugMode.hasAttribute = jest.fn().mockReturnValue(true)
			debugMode.removeAttribute = jest.fn()

			popup.onTabUpdated(1, { status: 'complete' }, {})

			expect(debugMode.hasAttribute).toHaveBeenCalledWith('disabled')
			expect(debugMode.removeAttribute).toHaveBeenCalledWith('disabled')
		})

		it('Should call the onTabUpdated function without the button', () => {
			const debugMode = document.querySelector('#debugMode')

			debugMode.hasAttribute = jest.fn()
			debugMode.removeAttribute = jest.fn()

			debugMode.remove()

			popup.onTabUpdated(1, { status: 'complete' }, {})

			expect(debugMode.hasAttribute).not.toHaveBeenCalled()
			expect(debugMode.removeAttribute).not.toHaveBeenCalled()
		})

		it('Should call the onTabUpdated function without the disabled attribute', () => {
			const debugMode = document.querySelector('#debugMode')

			debugMode.hasAttribute = jest.fn()
			debugMode.removeAttribute = jest.fn()

			popup.onTabUpdated(1, { status: 'complete' }, {})

			expect(debugMode.hasAttribute).toHaveBeenCalled()
			expect(debugMode.removeAttribute).not.toHaveBeenCalled()
		})

		it('Should call the onTabUpdated function with the tab loading', () => {
			const debugMode = document.querySelector('#debugMode')

			debugMode.setAttribute('disabled', '')

			debugMode.hasAttribute = jest.fn()
			debugMode.removeAttribute = jest.fn()

			popup.onTabUpdated(1, { status: 'loading' }, {})

			expect(debugMode.hasAttribute).toHaveBeenCalled()
			expect(debugMode.removeAttribute).not.toHaveBeenCalled()
		})
	})
})
