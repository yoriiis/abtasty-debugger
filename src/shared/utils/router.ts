import { DynamicSegments } from 'shared/assets/interfaces/interfaces'

export default class Router {
	isNotFound: null | Boolean
	onDestroy: Function
	onCreate: Function
	isReady: Boolean
	defaultRoute: string
	notFoundRoute: string
	currentRoute: null | string
	previousRoute: null | string

	constructor({ onDestroy, onCreate }: { onDestroy: Function; onCreate: Function }) {
		this.onDestroy = onDestroy
		this.onCreate = onCreate

		this.isNotFound = null
		this.isReady = false
		this.defaultRoute = '/'
		this.notFoundRoute = '/empty'
		this.currentRoute = null
		this.previousRoute = null

		this.onHashChange = this.onHashChange.bind(this)
	}

	/**
	 * Initialize the router
	 */
	init({ isNotFound }: { isNotFound: Boolean }) {
		this.isNotFound = isNotFound

		// Get current route
		const route = this.getRoute()

		// Detect if the router need to redirect to the not found or the default route
		let newRoute = null
		if (isNotFound && route !== this.notFoundRoute) {
			newRoute = this.notFoundRoute
		} else if (route === '' || (route === this.notFoundRoute && !isNotFound)) {
			newRoute = this.defaultRoute
		}

		// Declare the default route
		// If route exist, keep it, else set it to the default route
		this.currentRoute = newRoute || route

		// Init the router with the default route
		if (newRoute) {
			this.setRoute(this.currentRoute)
		} else {
			// Page started with a route, trigger hash changed
			this.onHashChange()
		}

		this.addEvents()
	}

	/**
	 * Get the current route
	 * @returns {String} Current route
	 */
	getRoute(): string {
		return window.location.hash.substr(1)
	}

	/**
	 * Set the route
	 */
	setRoute(route: string) {
		window.location.hash = route
	}

	/**
	 * On hash change event listener
	 * @param {Obhect} e Event data
	 */
	onHashChange(e?: HashChangeEvent): void {
		this.currentRoute = this.getRoute()

		// Redirect to the not found route if necessary
		if (this.isNotFound && this.currentRoute !== this.notFoundRoute) {
			this.setRoute(this.notFoundRoute)
			return
		}

		if (e) {
			this.previousRoute = this.getPreviousRoute(e)

			if (this.previousRoute) {
				// Destroy the previous step
				this.onDestroy(this.previousRoute)

				// Create the new step on destruction callback
				this.onCreate(this.currentRoute)

				this.isReady = true
			}
		}

		// If destroy method was not called, create the step now
		if (!this.isReady) {
			this.onCreate(this.currentRoute)
		}
	}

	/**
	 * Get the previous route
	 * @param {Object} event Event listener datas
	 * @returns {String} Previous route
	 */
	getPreviousRoute(e: HashChangeEvent): string | null {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null
	}

	/**
	 * Get dynamic segments
	 * @param {String} route Instance route
	 * @returns {Object} Corresponding table with dynamic segments and values
	 */
	getDynamicSegments(route: string): DynamicSegments | null {
		if (route && this.currentRoute) {
			const routeFromUrlSplit = this.transformRouteInArray(this.currentRoute)
			const routeFromAppSplit = this.transformRouteInArray(route)
			const data: any = {}
			routeFromAppSplit.forEach((route: string, index: number) => {
				if (route.startsWith(':')) {
					data[route] = routeFromUrlSplit[index]
				}
			})
			return data
		}

		return null
	}

	/**
	 * Transform route in array (split with slash)
	 * @param {String} route Route
	 * @returns {Array} Array with route segment
	 */
	transformRouteInArray(route: string): Array<string> {
		if (route === '/') {
			return [route]
		} else {
			const routeSplit = route.split('/')
			routeSplit.shift()
			return routeSplit
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		window.addEventListener('hashchange', this.onHashChange)
	}
}
