import { createElement, Fragment } from 'jsx-dom'
import validateTarget from 'validate-target'
import Popup from '../assets/scripts/popup'
import fixturesAbtasty from '../../shared/assets/fixtures/abtasty.json'
import DataManager from 'shared/utils/data-manager'
import Router from 'shared/utils/router'

jest.mock('validate-target')
jest.mock('shared/utils/data-manager', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getSortedData: jest.fn().mockReturnValue({
				testsSortedByStatus: {},
				targetingsSortedByStatus: {
					foo: true
				}
			}),
			getTestsSortedByStatus: jest.fn(),
			getTargetingsSortedByStatus: jest.fn()
		}
	})
})
jest.mock('shared/utils/router')

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
		data: fixturesAbtasty,
		instances: [Detail, Empty]
	})

beforeEach(() => {
	instanceDetail = new Detail()
	document.body.append(
		<>
			<div id="app">
				<div className="detail">
					<div className="targeting">
						<div className="targeting-header">
							<button className="targeting-headerButton"></button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
	popup = getInstance()
})

afterEach(() => {
	document.body.innerHTML = ''
	jest.clearAllMocks()
})

describe('Popup constructor', () => {
	it('Should initialize the constructor', () => {
		expect(popup.data).toStrictEqual(fixturesAbtasty)
		expect(popup.app).toBe(document.querySelector('#app'))
		expect(DataManager).toHaveBeenCalled()
		expect(Router).toHaveBeenCalledWith({
			isNotFound: false,
			onDestroy: popup.onDestroy,
			onCreate: popup.onCreate
		})
	})
})

describe('Popup analyzeInstance', () => {
	it('Should call the analyzeInstance function', () => {
		const result = popup.analyzeInstance()

		expect(result).toMatchObject(instancesResult)
		expect(result[0]).toBeInstanceOf(Detail)
		expect(result[0].requestDynamicSegments).toEqual(expect.any(Function))
		expect(result[0].requestData).toEqual(expect.any(Function))
		expect(result[0].requestDataManager).toEqual(expect.any(Function))
	})
})

describe('Popup init', () => {
	beforeEach(() => {
		popup.router.init = jest.fn()
		popup.addEvents = jest.fn()
	})

	afterEach(() => {
		expect(popup.analyzeInstance).toHaveBeenCalled()
	})

	it('Should call the init function', () => {
		popup.analyzeInstance = jest.fn().mockReturnValue(instancesResult)

		popup.init()

		expect(popup.router.init).toHaveBeenCalled()
		expect(popup.addEvents).toHaveBeenCalled()
	})

	it('Should call the init function without instances result', () => {
		popup.analyzeInstance = jest.fn().mockReturnValue([])

		popup.init()

		expect(popup.router.init).not.toHaveBeenCalled()
		expect(popup.addEvents).not.toHaveBeenCalled()
	})
})

describe('Popup addEvents', () => {
	it('Should call the addEvents function', () => {
		popup.app.addEventListener = jest.fn()

		popup.addEvents()

		expect(popup.app.addEventListener).toHaveBeenCalledWith('click', popup.onClickOnApp)
	})
})

describe('Popup onClickOnApp', () => {
	it('Should call the onClickOnApp function', () => {
		popup.toggleTageting = jest.fn()

		const target = document.querySelector('.targeting-headerButton')
		validateTarget.mockReturnValueOnce(true)

		popup.onClickOnApp({
			target
		})

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '.targeting-headerButton',
			nodeName: ['button']
		})
		expect(popup.toggleTageting).toHaveBeenCalled()
	})

	it('Should call the onClickOnApp function with no valid element', () => {
		popup.toggleTageting = jest.fn()

		const target = document.querySelector('.targeting-header')
		validateTarget.mockReturnValueOnce(false)

		popup.onClickOnApp({
			target
		})

		expect(popup.toggleTageting).not.toHaveBeenCalled()
	})
})

describe('Popup toggleTageting', () => {
	it('Should call the toggleTageting function', () => {
		const target = document.querySelector('.targeting-headerButton')

		target.closest('.targeting').classList.toggle = jest.fn()

		popup.toggleTageting({
			target
		})

		expect(target.closest('.targeting').classList.toggle).toHaveBeenCalledWith('active')
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
