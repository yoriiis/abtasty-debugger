import Router from '../router'
import fixturesAbtasty from '../../shared/assets/fixtures/abtasty.json'

let router
let event
const getInstance = () =>
	new Router({
		isNotFound: false,
		onDestroy: () => {},
		onCreate: () => {}
	})

beforeEach(() => {
	event = {
		target: true,
		oldURL: 'http://localhost.com/#list'
	}
	router = getInstance()
})

describe('Router constructor', () => {
	it('Should initialize the constructor', () => {
		expect(router.isNotFound).toBe(false)
		expect(router.onDestroy).toStrictEqual(expect.any(Function))
		expect(router.onCreate).toStrictEqual(expect.any(Function))
		expect(router.isReady).toBe(false)
		expect(router.defaultRoute).toBe('/')
		expect(router.notFoundRoute).toBe('/empty')
		expect(router.currentRoute).toBe(null)
		expect(router.previousRoute).toBe(null)
	})
})

describe('Router init', () => {
	beforeEach(() => {
		router.setRoute = jest.fn()
		router.onHashChange = jest.fn()
		router.addEvents = jest.fn()
	})

	afterEach(() => {
		expect(router.addEvents).toHaveBeenCalled()
	})

	it('Should call the init function with the default route', () => {
		router.getRoute = jest.fn().mockReturnValue('')

		router.init()

		expect(router.defaultRoute).toBe('/')
		expect(router.currentRoute).toBe('/')
		expect(router.setRoute).toHaveBeenCalledWith('/')
		expect(router.onHashChange).not.toHaveBeenCalled()
	})

	it('Should call the init function with already a route', () => {
		router.getRoute = jest.fn().mockReturnValue('detail/000001')

		router.init()

		expect(router.defaultRoute).toBe('/')
		expect(router.currentRoute).toBe('detail/000001')
		expect(router.setRoute).not.toHaveBeenCalledWith()
		expect(router.onHashChange).toHaveBeenCalled()
	})

	it('Should call the init function with no data', () => {
		router.getRoute = jest.fn()

		router.isNotFound = true
		router.init()

		expect(router.defaultRoute).toBe('/empty')
	})
})

describe('Popup getRoute', () => {
	it('Should call the getRoute function on the list step', () => {
		window.location.hash = '#list'

		expect(router.getRoute()).toBe('list')
	})
})

describe('Popup setRoute', () => {
	it('Should call the setRoute function', () => {
		router.setRoute('list')

		expect(window.location.hash).toBe('#list')
	})
})

describe('Popup onHashChange', () => {
	it('Should call the onHashChange function', () => {
		router.getRoute = jest.fn().mockReturnValue('detail/000001')
		router.getPreviousRoute = jest.fn().mockReturnValue('list')
		router.onDestroy = jest.fn()
		router.onCreate = jest.fn()

		router.onHashChange(event)

		expect(router.currentRoute).toBe('detail/000001')
		expect(router.getPreviousRoute).toHaveBeenCalledWith(event)
		expect(router.onDestroy).toHaveBeenCalledWith('list')
		expect(router.onCreate).toHaveBeenCalledWith('detail/000001')
		expect(router.isReady).toBe(true)
	})

	it('Should call the onHashChange function with no previous route', () => {
		router.getRoute = jest.fn().mockReturnValue('list')
		router.getPreviousRoute = jest.fn().mockReturnValue(null)
		router.onDestroy = jest.fn()
		router.onCreate = jest.fn()

		router.onHashChange({})

		expect(router.currentRoute).toBe('list')
		expect(router.getPreviousRoute).not.toHaveBeenCalledWith(event)
		expect(router.onDestroy).not.toHaveBeenCalled()
		expect(router.onCreate).toHaveBeenCalledWith('list')
		expect(router.isReady).toBe(false)
	})

	it('Should call the onHashChange function with no event', () => {
		router.getRoute = jest.fn().mockReturnValue('detail/000001')
		router.getPreviousRoute = jest.fn().mockReturnValue('list')
		router.onDestroy = jest.fn()
		router.onCreate = jest.fn()

		router.onHashChange()

		expect(router.currentRoute).toBe('detail/000001')
		expect(router.getPreviousRoute).not.toHaveBeenCalledWith(event)
		expect(router.onDestroy).not.toHaveBeenCalledWith('list')
		expect(router.onCreate).toHaveBeenCalledWith('detail/000001')
		expect(router.isReady).toBe(false)
	})
})

describe('Popup getPreviousRoute', () => {
	it('Should call the getPreviousRoute function', () => {
		const result = router.getPreviousRoute(event)

		expect(result).toBe('list')
	})

	it('Should call the getPreviousRoute function without oldURL', () => {
		const result = router.getPreviousRoute({
			oldURL: ''
		})

		expect(result).toBe(null)
	})
})

describe('Popup getDynamicSegments', () => {
	it('Should call the getDynamicSegments function', () => {
		router.transformRouteInArray = jest
			.fn()
			.mockReturnValueOnce(['detail', '000001'])
			.mockReturnValueOnce(['detail', ':testId'])

		router.currentRoute = '/detail/000001'
		const result = router.getDynamicSegments('/detail/:testId')

		expect(result).toStrictEqual({ ':testId': '000001' })
		expect(router.transformRouteInArray).toHaveBeenCalledTimes(2)
	})

	it('Should call the getDynamicSegments function without route', () => {
		router.transformRouteInArray = jest.fn()

		router.currentRoute = '/detail/000001'
		const result = router.getDynamicSegments()

		expect(result).toStrictEqual(null)
		expect(router.transformRouteInArray).not.toHaveBeenCalled()
	})
})

describe('Popup transformRouteInArray', () => {
	it('Should call the transformRouteInArray function', () => {
		const result = router.transformRouteInArray('/detail/000001')

		expect(result).toStrictEqual(['detail', '000001'])
	})

	it('Should call the transformRouteInArray function with the / route', () => {
		const result = router.transformRouteInArray('/')

		expect(result).toStrictEqual(['/'])
	})
})

describe('Popup addEvents', () => {
	it('Should call the addEvents function', () => {
		window.addEventListener = jest.fn()

		router.addEvents()

		expect(window.addEventListener).toHaveBeenCalledWith('hashchange', router.onHashChange)
	})
})
