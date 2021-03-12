import { createElement, Fragment } from 'jsx-dom'
import validateTarget from 'validate-target'
import Popup from '../assets/scripts/popup'
import fixturesAbtasty from '../../shared/assets/fixtures/abtasty.json'
import DataManager from 'shared/utils/data-manager'

jest.mock('validate-target')
jest.mock('../components/list/assets/scripts/list', () => {
	return jest.fn().mockImplementation(() => {
		return <div data-route-id="list"></div>
	})
})
jest.mock('shared/empty/assets/scripts/empty', () => {
	return jest.fn().mockImplementation(() => {
		return <div data-route-id="empty"></div>
	})
})
jest.mock('../components/detail/assets/scripts/detail', () => {
	return jest.fn().mockImplementation(() => {
		return <div data-route-id="detail"></div>
	})
})
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

let popup
let event
const getInstance = () =>
	new Popup({
		data: fixturesAbtasty
	})

beforeEach(() => {
	event = {
		target: true,
		oldURL: 'http://localhost.com/#list'
	}
	document.body.append(
		<>
			<div id="app">
				<div data-route-id="detail">
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
})

describe('Popup constructor', () => {
	it('Should initialize the constructor', () => {
		expect(popup.data).toStrictEqual(fixturesAbtasty)
		expect(popup.currentRoute).toBe(null)
		expect(popup.previousRoute).toBe(null)
		expect(popup.defaultRoute).toBe('list')
		expect(popup.stepCreated).toBe(false)
		expect(popup.app).toBe(document.querySelector('#app'))
		expect(DataManager).toHaveBeenCalled()
		expect(popup.dataManager.getSortedData).toHaveBeenCalled()
		expect(popup.templates).toMatchObject({
			empty: expect.any(Function),
			list: expect.any(Function),
			detail: expect.any(Function)
		})
	})
})

describe('Popup init', () => {
	it('Should call the init function with the default route', () => {
		popup.getRoute = jest.fn().mockReturnValue('')
		popup.setRoute = jest.fn()
		popup.hashChanged = jest.fn()
		popup.addEvents = jest.fn()

		popup.init()

		expect(popup.defaultRoute).toBe('list')
		expect(popup.currentRoute).toBe('list')
		expect(popup.setRoute).toHaveBeenCalledWith('list')
		expect(popup.hashChanged).not.toHaveBeenCalled()
		expect(popup.addEvents).toHaveBeenCalled()
	})

	it('Should call the init function with already a route', () => {
		popup.getRoute = jest.fn().mockReturnValue('detail/000001')
		popup.setRoute = jest.fn()
		popup.hashChanged = jest.fn()
		popup.addEvents = jest.fn()

		popup.init()

		expect(popup.defaultRoute).toBe('list')
		expect(popup.currentRoute).toBe('detail/000001')
		expect(popup.setRoute).not.toHaveBeenCalledWith()
		expect(popup.hashChanged).toHaveBeenCalled()
		expect(popup.addEvents).toHaveBeenCalled()
	})

	it('Should call the init function with no data', () => {
		popup.getRoute = jest.fn().mockReturnValue('')
		popup.setRoute = jest.fn()
		popup.hashChanged = jest.fn()
		popup.addEvents = jest.fn()

		popup.data = null
		popup.init()

		expect(popup.defaultRoute).toBe('empty')
	})
})

describe('Popup getRoute', () => {
	it('Should call the getRoute function on the list step', () => {
		window.location.hash = '#list'

		expect(popup.getRoute()).toBe('list')
	})
})

describe('Popup setRoute', () => {
	it('Should call the setRoute function', () => {
		popup.setRoute('list')

		expect(window.location.hash).toBe('#list')
	})
})

describe('Popup hashChanged', () => {
	it('Should call the hashChanged function', () => {
		popup.getRoute = jest.fn().mockReturnValue('detail/000001')
		popup.getPreviousRoute = jest.fn().mockReturnValue('list')
		popup.destroyStep = jest.fn()
		popup.createStep = jest.fn()

		popup.hashChanged(event)

		expect(popup.currentRoute).toBe('detail/000001')
		expect(popup.getPreviousRoute).toHaveBeenCalledWith(event)
		expect(popup.destroyStep).toHaveBeenCalledWith('list')
		expect(popup.createStep).toHaveBeenCalledWith('detail/000001')
		expect(popup.stepCreated).toBe(true)
	})

	it('Should call the hashChanged function with no previous route', () => {
		popup.getRoute = jest.fn().mockReturnValue('list')
		popup.getPreviousRoute = jest.fn().mockReturnValue(null)
		popup.destroyStep = jest.fn()
		popup.createStep = jest.fn()

		popup.hashChanged({})

		expect(popup.currentRoute).toBe('list')
		expect(popup.getPreviousRoute).not.toHaveBeenCalledWith(event)
		expect(popup.destroyStep).not.toHaveBeenCalled()
		expect(popup.createStep).toHaveBeenCalledWith('list')
		expect(popup.stepCreated).toBe(false)
	})

	it('Should call the hashChanged function with no event', () => {
		popup.getRoute = jest.fn().mockReturnValue('detail/000001')
		popup.getPreviousRoute = jest.fn().mockReturnValue('list')
		popup.destroyStep = jest.fn()
		popup.createStep = jest.fn()

		popup.hashChanged()

		expect(popup.currentRoute).toBe('detail/000001')
		expect(popup.getPreviousRoute).not.toHaveBeenCalledWith(event)
		expect(popup.destroyStep).not.toHaveBeenCalledWith('list')
		expect(popup.createStep).toHaveBeenCalledWith('detail/000001')
		expect(popup.stepCreated).toBe(false)
	})
})

describe('Popup getPreviousRoute', () => {
	it('Should call the getPreviousRoute function', () => {
		const result = popup.getPreviousRoute(event)

		expect(result).toBe('list')
	})

	it('Should call the getPreviousRoute function without oldURL', () => {
		const result = popup.getPreviousRoute({
			oldURL: ''
		})

		expect(result).toBe(null)
	})
})

describe('Popup destroyStep', () => {
	it('Should call the destroyStep function', () => {
		popup.removeElement = jest.fn()
		popup.getRouteSection = jest.fn().mockReturnValue('detail')

		popup.destroyStep('detail/000001')

		expect(popup.getRouteSection).toHaveBeenCalledWith('detail/000001')
		expect(popup.removeElement).toHaveBeenCalledWith(
			popup.app.querySelector('[data-route-id="detail"]')
		)
	})

	it('Should call the destroyStep function', () => {
		popup.removeElement = jest.fn()
		popup.getRouteSection = jest.fn().mockReturnValue('list')
		popup.app.querySelector('[data-route-id="detail"]').remove = jest.fn()

		popup.destroyStep('list/000001')

		expect(popup.getRouteSection).toHaveBeenCalledWith('list/000001')
		expect(popup.removeElement).not.toHaveBeenCalled()
	})
})

describe('Popup removeElement', () => {
	it('Should call the removeElement function', () => {
		const element = popup.app.querySelector('[data-route-id="detail"]')
		element.remove = jest.fn()

		popup.removeElement(element)

		expect(element.remove).toHaveBeenCalled()
	})
})

describe('Popup createStep', () => {
	it('Should call the createStep function', () => {
		popup.getTestIdFromRoute = jest.fn().mockReturnValue('000001')
		popup.getRouteSection = jest.fn().mockReturnValue('detail')
		popup.getTemplate = jest.fn().mockReturnValue(<div></div>)
		popup.app.appendChild = jest.fn()

		const route = 'detail/000001'
		popup.createStep(route)

		expect(popup.getTestIdFromRoute).toHaveBeenCalledWith(route)
		expect(popup.getRouteSection).toHaveBeenCalledWith(route)
		expect(popup.getTemplate).toHaveBeenCalledWith({ routeSection: 'detail', testId: '000001' })
		expect(popup.app.appendChild).toHaveBeenCalledWith(<div></div>)
	})
})

describe('Popup getTemplate', () => {
	it('Should call the getTemplate function with list', () => {
		const result = popup.getTemplate({ routeSection: 'list' })

		expect(result).toStrictEqual(<div data-route-id="list"></div>)
	})

	it('Should call the getTemplate function with detail', () => {
		const result = popup.getTemplate({ routeSection: 'detail', testId: '000001' })

		expect(result).toStrictEqual(<div data-route-id="detail"></div>)
	})

	it('Should call the getTemplate function with empty', () => {
		const result = popup.getTemplate({ routeSection: 'empty' })

		expect(result).toStrictEqual(<div data-route-id="empty"></div>)
	})
})

describe('Popup getRouteSection', () => {
	it('Should call the getRouteSection function', () => {
		const result = popup.getRouteSection('detail/000001')

		expect(result).toBe('detail')
	})
})

describe('Popup getTestIdFromRoute', () => {
	it('Should call the getTestIdFromRoute function', () => {
		const result = popup.getTestIdFromRoute('detail/000001')

		expect(result).toBe('000001')
	})

	it('Should call the getTestIdFromRoute function with no id', () => {
		const result = popup.getTestIdFromRoute()

		expect(result).toBe(null)
	})
})

describe('Popup addEvents', () => {
	it('Should call the addEvents function', () => {
		popup.app.addEventListener = jest.fn()
		window.addEventListener = jest.fn()

		popup.addEvents()

		expect(popup.app.addEventListener).toHaveBeenCalledWith('click', popup.onClickOnApp)
		expect(window.addEventListener).toHaveBeenCalledWith('hashchange', popup.hashChanged)
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

		expect(validateTarget).toHaveBeenCalledWith({
			target,
			selectorString: '.targeting-headerButton',
			nodeName: ['button']
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
