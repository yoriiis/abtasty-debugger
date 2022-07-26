import { createElement } from 'jsx-dom'
import validateTarget from 'validate-target'
import Popup from '../assets/scripts/popup'
import fixturesAbtasty from '../../shared/assets/fixtures/abtasty.json'
import DataManager from 'shared/utils/data-manager'
import Router from 'shared/utils/router'
import { namespace, sendMessage } from 'shared/utils/bridge'

const testId = '100002'
const newVariationId = '200002'
const abtastyCookie = `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.820024.1.1.1.1.1632216664066.1632216664066.1_${testId}.200001.1.1.1.1.1632216664068.1632216664068.1`

jest.mock('validate-target')
jest.mock('shared/utils/data-manager')
jest.mock('shared/utils/router')
jest.mock('shared/utils/bridge', () => {
	return {
		sendMessage: jest.fn().mockImplementation(({ action, data, callback }) => {
			let response = null
			if (action === 'getCookie' && data.name === 'ABTasty') {
				response = abtastyCookie
			}
			callback instanceof Function && callback(response)
		}),
		isExtensionMode: true,
		namespace: {
			tabs: {
				onUpdated: {
					addListener: jest.fn()
				},
				reload: jest.fn()
			}
		}
	}
})

class Detail {
	id = 'detail'
	route = '/detail/:testId'
	selector = '.detail'

	render() {
		this.getTemplate(this.getData())
	}

	getData() {
		return {
			testsSortedByStatus: []
		}
	}

	getTemplate() {
		return <div>Detail</div>
	}
}

class Empty {
	id = 'empty'
	route = '/empty'
	selector = '.empty'

	render() {
		this.getTemplate(this.getData())
	}

	getData() {
		return {
			testsSortedByStatus: []
		}
	}

	getTemplate() {
		return <div>Empty</div>
	}
}

let popup
const routeDetail = 'detail/000001'
let instanceDetail
const instancesResult = [new Detail(), new Empty()]

const getInstance = () =>
	new Popup({
		data: { ...fixturesAbtasty }, // Clone the object to prevent conflict between tests with object reference
		instances: [Detail, Empty]
	})

beforeEach(() => {
	instanceDetail = new Detail()
	document.body.append(
		<div id="app">
			<div className="list">
				<ul className="list-nav">
					<li className="list-navItem">
						<button className="list-navItemButton clearCookies">
							<div className="list-navItemButtonIcon"></div>
							Reload tag
						</button>
					</li>
					<li className="list-navItem">
						<label
							htmlFor="debugMode"
							className="list-navItemLabel"
							title="See DevTools > Console for debug logs"
						>
							Debug mode
						</label>
						<div className="customCheckbox">
							<input
								type="checkbox"
								value="false"
								className="customCheckbox-input"
								id="debugMode"
								name="debug"
							/>
							<span className="customCheckbox-round">
								<div className="customCheckbox-roundIcon"></div>
							</span>
						</div>
					</li>
				</ul>
			</div>
			<div className="detail">
				<div className="collapse">
					<div className="collapse-header">
						<button className="collapse-headerButton"></button>
					</div>
					<div className="collapse-content">
						<div className="variation">
							<ul className="variation-list">
								<li className="variation-listItem">
									<div className="customRadio">
										<input
											type="radio"
											value={newVariationId}
											id={`variation-${newVariationId}`}
											className="customRadio-input variation-inputRadio"
											name="variationId"
											data-test-id={testId}
											checked
										/>
										<span className="customRadio-round"></span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

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

describe('Popup constructor', () => {
	it('Should initialize the constructor', () => {
		expect(popup.data).toStrictEqual(fixturesAbtasty)
		expect(popup.instances).toStrictEqual([Detail, Empty])
		expect(popup.instancesResult).toStrictEqual([])
		expect(popup.formattedData).toBe(null)
		expect(popup.app).toBe(document.querySelector('#app'))
		expect(DataManager).toHaveBeenCalled()
		expect(Router).toHaveBeenCalledWith({
			onDestroy: popup.onDestroy,
			onCreate: popup.onCreate
		})
	})

	it('Should initialize the constructor with the default value', () => {
		const popupCustom = new Popup({
			data: { ...fixturesAbtasty }
		})

		expect(popupCustom.instances).toStrictEqual([])
	})
})

describe('Popup init', () => {
	beforeEach(() => {
		popup.analyzeInstance = jest.fn().mockReturnValue(instancesResult)
		popup.isNotFound = jest.fn().mockReturnValue(false)
		popup.router.init = jest.fn()
		popup.addEvents = jest.fn()
	})

	afterEach(() => {
		expect(popup.analyzeInstance).toHaveBeenCalled()
		expect(popup.instancesResult).toStrictEqual(instancesResult)
		expect(popup.router.init).toHaveBeenCalledWith({ isNotFound: false })
		expect(popup.addEvents).toHaveBeenCalled()
	})

	it('Should call the init function', () => {
		popup.dataManager.getFormattedData = jest.fn().mockReturnValue({ dataFormatted: true })

		popup.init()

		expect(popup.dataManager.getFormattedData).toHaveBeenCalledWith(fixturesAbtasty)
		expect(popup.formattedData).toStrictEqual({ dataFormatted: true })
	})

	it('Should call the init function without data', () => {
		popup.dataManager.getFormattedData = jest.fn()

		popup.data = null
		popup.init()

		expect(popup.dataManager.getFormattedData).not.toHaveBeenCalled()
		expect(popup.formattedData).toBe(null)
	})

	it('Should call the init function without results inside data', () => {
		popup.dataManager.getFormattedData = jest.fn()

		popup.data.results = null
		popup.init()

		expect(popup.dataManager.getFormattedData).not.toHaveBeenCalled()
		expect(popup.formattedData).toBe(null)
	})
})

describe('Popup analyzeInstance', () => {
	it('Should call the analyzeInstance function', () => {
		const route = '/detail/:testId'
		const dynamicSegmentsReturnValue = { ':testId': '100002' }
		const formattedDataReturnValue = { dataFormatted: true }

		popup.router.getDynamicSegments = jest.fn().mockReturnValue(dynamicSegmentsReturnValue)

		popup.formattedData = formattedDataReturnValue
		const result = popup.analyzeInstance()

		const dynamicSegments = result[0].requestDynamicSegments(route)
		const data = result[0].requestData()
		const formattedData = result[0].requestFormattedData()

		expect(result).toMatchObject(instancesResult)
		expect(result[0]).toBeInstanceOf(Detail)
		expect(result[0].requestDynamicSegments).toEqual(expect.any(Function))
		expect(result[0].requestData).toEqual(expect.any(Function))
		expect(result[0].requestFormattedData).toEqual(expect.any(Function))
		expect(popup.router.getDynamicSegments).toHaveBeenCalledWith(route)
		expect(dynamicSegments).toStrictEqual(dynamicSegmentsReturnValue)
		expect(data).toStrictEqual(popup.data)
		expect(formattedData).toStrictEqual(formattedDataReturnValue)
	})
})

describe('Popup isNotFound', () => {
	it('Should call the isNotFound function with no data', () => {
		popup.data = null
		const result = popup.isNotFound()

		expect(result).toBe(true)
	})

	it('Should call the isNotFound function with no results key inside data', () => {
		delete popup.data.results
		const result = popup.isNotFound()

		expect(result).toBe(true)
	})

	it('Should call the isNotFound function with no results inside data', () => {
		popup.data.results = null
		const result = popup.isNotFound()

		expect(result).toBe(true)
	})

	it('Should call the isNotFound function with all valid fields', () => {
		const result = popup.isNotFound()

		expect(result).toBe(false)
	})
})

describe('Popup addEvents', () => {
	it('Should call the addEvents function', () => {
		popup.app.addEventListener = jest.fn()

		popup.addEvents()

		expect(popup.app.addEventListener).toHaveBeenCalledWith('click', popup.onClickOnApp)
		expect(popup.app.addEventListener).toHaveBeenCalledWith('change', popup.onChangeOnApp)
		expect(namespace.tabs.onUpdated.addListener).toHaveBeenCalledWith(popup.onTabUpdated)
	})
})

describe('Popup onClickOnApp', () => {
	it('Should call the onClickOnApp function with the collapse header button', () => {
		popup.toggleCollapse = jest.fn()

		const target = document.querySelector('.collapse-headerButton')
		validateTarget
			.mockReturnValueOnce(true)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)

		popup.onClickOnApp({
			target
		})

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '.collapse-headerButton',
			nodeName: ['button']
		})
		expect(popup.toggleCollapse).toHaveBeenCalled()
	})

	it('Should call the onClickOnApp function with the retry button', () => {
		popup.retry = jest.fn()

		const target = document.querySelector('.empty-retryButton')
		validateTarget
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(true)
			.mockReturnValueOnce(false)

		popup.onClickOnApp({
			target
		})

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '.empty-retryButton',
			nodeName: ['button']
		})
		expect(popup.retry).toHaveBeenCalled()
	})

	it('Should call the onClickOnApp function with the reload button', () => {
		popup.clearCookies = jest.fn()

		const target = document.querySelector('.clearCookies')
		validateTarget
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(true)

		popup.onClickOnApp({
			target
		})

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '.clearCookies',
			nodeName: ['button']
		})
		expect(popup.clearCookies).toHaveBeenCalled()
	})

	it('Should call the onClickOnApp function with no valid element', () => {
		popup.toggleCollapse = jest.fn()
		popup.retry = jest.fn()
		popup.clearCookies = jest.fn()

		const target = document.querySelector('body')
		validateTarget
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)

		popup.onClickOnApp({
			target
		})

		expect(popup.toggleCollapse).not.toHaveBeenCalled()
		expect(popup.retry).not.toHaveBeenCalled()
		expect(popup.clearCookies).not.toHaveBeenCalled()
	})
})

describe('Popup toggleCollapse', () => {
	it('Should call the toggleCollapse function', () => {
		const target = document.querySelector('.collapse-headerButton')

		target.closest('.collapse').classList.toggle = jest.fn()

		popup.toggleCollapse({
			target
		})

		expect(target.closest('.collapse').classList.toggle).toHaveBeenCalledWith('active')
	})

	it('Should call the toggleCollapse function with header only', () => {
		const target = document.querySelector('.collapse-headerButton')

		target.closest('.collapse').classList.toggle = jest.fn()

		document.querySelector('.collapse').classList.add('headerOnly')
		popup.toggleCollapse({
			target
		})

		expect(target.closest('.collapse').classList.toggle).not.toHaveBeenCalled()
	})
})

describe('Popup retry', () => {
	it('Should call the retry function', () => {
		const target = document.querySelector('.empty-retryButton')
		const event = {
			preventDefault: jest.fn(),
			target
		}

		popup.retry(event)

		expect(window.location.reload).toHaveBeenCalled()
		expect(event.preventDefault).toHaveBeenCalled()
	})
})

describe('Popup clearCookies', () => {
	it('Should call the clearCookies function', () => {
		const target = document.querySelector('.clearCookies')
		const event = {
			preventDefault: jest.fn(),
			target
		}

		popup.clearCookies(event)

		expect(event.preventDefault).toHaveBeenCalled()
		expect(sendMessage).toHaveBeenCalledWith({
			action: 'clearAbtastyCookies'
		})
		expect(namespace.tabs.reload).toHaveBeenCalled()
		expect(window.close).toHaveBeenCalled()
	})
})

describe('Popup onChangeOnApp', () => {
	it('Should call the onChangeOnApp function with the input radio', () => {
		popup.switchVariation = jest.fn()

		const target = document.querySelector('.variation-inputRadio')
		validateTarget.mockReturnValueOnce(true).mockReturnValueOnce(false)

		popup.onChangeOnApp({
			target
		})

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '.variation-inputRadio',
			nodeName: ['input']
		})
		expect(popup.switchVariation).toHaveBeenCalled()
	})

	it('Should call the onChangeOnApp function with the input checkbox', () => {
		popup.toggleDebugMode = jest.fn()

		const target = document.querySelector('#debugMode')
		validateTarget.mockReturnValueOnce(false).mockReturnValueOnce(true)

		popup.onChangeOnApp({
			target
		})

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '#debugMode',
			nodeName: ['input']
		})
		expect(popup.toggleDebugMode).toHaveBeenCalled()
	})

	it('Should call the onChangeOnApp function with no valid element', () => {
		popup.switchVariation = jest.fn()
		popup.toggleDebugMode = jest.fn()

		const target = document.querySelector('body')
		validateTarget.mockReturnValueOnce(false).mockReturnValueOnce(false)

		popup.onChangeOnApp({
			target
		})

		expect(popup.switchVariation).not.toHaveBeenCalled()
		expect(popup.toggleDebugMode).not.toHaveBeenCalled()
	})
})

describe('Popup toggleDebugMode', () => {
	it('Should call the toggleDebugMode function', () => {
		const target = document.querySelector('#debugMode')
		const event = {
			target
		}

		target.setAttribute = jest.fn()

		popup.toggleDebugMode(event)

		expect(target.setAttribute).toHaveBeenCalledWith('disabled', '')
		expect(sendMessage).toHaveBeenCalledWith({
			action: 'removeCookie',
			data: {
				name: 'abTastyDebug',
				value: false
			}
		})
		expect(namespace.tabs.reload).toHaveBeenCalled()
	})

	it('Should call the toggleDebugMode function with the debug mode already enabled', () => {
		const target = document.querySelector('#debugMode')
		const event = {
			target
		}

		target.setAttribute = jest.fn()

		target.checked = true
		popup.toggleDebugMode(event)

		expect(target.setAttribute).toHaveBeenCalledWith('disabled', '')
		expect(sendMessage).toHaveBeenCalledWith({
			action: 'setStorage',
			data: {
				name: 'abTastyDebug',
				value: true
			}
		})
		expect(namespace.tabs.reload).toHaveBeenCalled()
	})
})

describe('Popup switchVariation', () => {
	it('Should call the switchVariation function', () => {
		const target = document.querySelector('.variation-inputRadio')
		const event = {
			target
		}

		popup.switchVariation(event)

		expect(sendMessage).toHaveBeenCalledTimes(2)
		expect(sendMessage).toHaveBeenNthCalledWith(1, {
			action: 'getCookie',
			data: {
				name: 'ABTasty'
			},
			callback: expect.any(Function)
		})
		expect(sendMessage).toHaveBeenNthCalledWith(2, {
			action: 'setStorage',
			data: {
				name: 'ABTasty',
				value: `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.820024.1.1.1.1.1632216664066.1632216664066.1_${testId}.${newVariationId}.1.1.1.1.1632216664068.1632216664068.1`,
				syncWithLocalStorage: true
			}
		})
		expect(namespace.tabs.reload).toHaveBeenCalled()
	})

	it('Should call the switchVariation function with a variation id negative', () => {
		const target = document.querySelector('.variation-inputRadio')
		const event = {
			target
		}

		const newVariationId = '-1'
		document.querySelector('.variation-inputRadio').value = newVariationId
		popup.switchVariation(event)

		expect(sendMessage).toHaveBeenCalledTimes(2)
		expect(sendMessage).toHaveBeenNthCalledWith(1, {
			action: 'getCookie',
			data: {
				name: 'ABTasty'
			},
			callback: expect.any(Function)
		})
		expect(sendMessage).toHaveBeenNthCalledWith(2, {
			action: 'setStorage',
			data: {
				name: 'ABTasty',
				value: `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.820024.1.1.1.1.1632216664066.1632216664066.1_${testId}.${newVariationId}.1.1.1.1.1632216664068.1632216664068.1`,
				syncWithLocalStorage: true
			}
		})
		expect(namespace.tabs.reload).toHaveBeenCalled()
	})

	it('Should call the switchVariation function with a variation id with more than 6 numbers', () => {
		const target = document.querySelector('.variation-inputRadio')
		const event = {
			target
		}

		const newVariationId = '123456789'
		document.querySelector('.variation-inputRadio').value = newVariationId
		popup.switchVariation(event)

		expect(sendMessage).toHaveBeenCalledTimes(2)
		expect(sendMessage).toHaveBeenNthCalledWith(1, {
			action: 'getCookie',
			data: {
				name: 'ABTasty'
			},
			callback: expect.any(Function)
		})
		expect(sendMessage).toHaveBeenNthCalledWith(2, {
			action: 'setStorage',
			data: {
				name: 'ABTasty',
				value: `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.820024.1.1.1.1.1632216664066.1632216664066.1_${testId}.${newVariationId}.1.1.1.1.1632216664068.1632216664068.1`,
				syncWithLocalStorage: true
			}
		})
		expect(namespace.tabs.reload).toHaveBeenCalled()
	})
})

describe('Popup onTabUpdated', () => {
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

describe('Popup onDestroy', () => {
	afterEach(() => {
		expect(popup.getInstanceFromRoute).toHaveBeenCalledWith(routeDetail)
	})

	it('Should call the onDestroy function', () => {
		popup.getInstanceFromRoute = jest.fn().mockReturnValue(instanceDetail)
		popup.removeElement = jest.fn()

		popup.onDestroy(routeDetail)

		expect(popup.removeElement).toHaveBeenCalledWith(popup.app.querySelector('.detail'))
	})

	it('Should call the onDestroy function without instance', () => {
		popup.getInstanceFromRoute = jest.fn().mockReturnValue()
		popup.removeElement = jest.fn()

		popup.onDestroy(routeDetail)

		expect(popup.removeElement).not.toHaveBeenCalled()
	})
})

describe('Popup removeElement', () => {
	it('Should call the removeElement function', () => {
		const element = popup.app.querySelector('.detail')
		element.remove = jest.fn()

		popup.removeElement(element)

		expect(element.remove).toHaveBeenCalled()
	})
})

describe('Popup onCreate', () => {
	afterEach(() => {
		expect(popup.getInstanceFromRoute).toHaveBeenCalledWith(routeDetail)
	})

	it('Should call the onCreate function', () => {
		instanceDetail.render = jest.fn().mockReturnValue(<div></div>)

		popup.getInstanceFromRoute = jest.fn().mockReturnValue(instanceDetail)
		popup.app.appendChild = jest.fn()

		popup.onCreate(routeDetail)

		expect(popup.app.appendChild).toHaveBeenCalledWith(<div></div>)
	})

	it('Should call the onCreate function without instance', () => {
		popup.getInstanceFromRoute = jest.fn().mockReturnValue()
		popup.app.appendChild = jest.fn()

		popup.onCreate(routeDetail)

		expect(popup.app.appendChild).not.toHaveBeenCalled()
	})
})

describe('Popup getInstanceFromRoute', () => {
	it('Should call the getInstanceFromRoute function', () => {
		popup.getNotFoundInstance = jest.fn()
		popup.router.transformRouteInArray = jest
			.fn()
			.mockReturnValueOnce(['detail', '000001'])
			.mockReturnValueOnce(['detail', ':testId'])
			.mockReturnValueOnce(['empty'])

		popup.instancesResult = instancesResult
		const result = popup.getInstanceFromRoute(routeDetail)

		expect(result).toStrictEqual(instanceDetail)
		expect(popup.getNotFoundInstance).not.toHaveBeenCalled()
	})

	it('Should call the getInstanceFromRoute function without result', () => {
		popup.getNotFoundInstance = jest.fn().mockReturnValue(new Empty())
		popup.router.transformRouteInArray = jest
			.fn()
			.mockReturnValueOnce(['list'])
			.mockReturnValueOnce(['detail', ':testId'])
			.mockReturnValueOnce(['empty'])

		popup.instancesResult = instancesResult
		const result = popup.getInstanceFromRoute('/list')

		expect(result).toStrictEqual(new Empty())
		expect(popup.getNotFoundInstance).toHaveBeenCalled()
	})
})

describe('Popup getNotFoundInstance', () => {
	it('Should call the getNotFoundInstance function', () => {
		popup.instancesResult = instancesResult
		const result = popup.getNotFoundInstance(routeDetail)

		expect(result).toStrictEqual(new Empty())
	})
})
