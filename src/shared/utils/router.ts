export default class Router {
	is404: Boolean;
	onDestroy: Function;
	onCreate: Function;
	stepCreated: Boolean;
	defaultRoute: string;
	notFoundRoute: string;
	currentRoute: null | string;
	previousRoute: null | string;

	constructor({ is404, onDestroy, onCreate }: { is404: Boolean, onDestroy: Function, onCreate: Function}) {
		this.is404 = is404
		this.onDestroy = onDestroy
		this.onCreate = onCreate

		this.stepCreated = false
		this.defaultRoute = '/'
		this.notFoundRoute = '/empty'
		this.currentRoute = null
		this.previousRoute = null

		this.onHashChange = this.onHashChange.bind(this)
	}

	init() {
		// Get current route
		const route = this.getRoute()

		// Redirect to the empty route if no data
		if (this.is404) {
			this.defaultRoute = this.notFoundRoute
		}

		// Declare the default route
		// If route exist, keep it, else set it to the default route
		this.currentRoute = route === '' ? this.defaultRoute : route

		// Init the router with the default route
		if (route === '') {
			this.setRoute(this.currentRoute)
		} else {
			// Page started with a route, trigger hash changed
			this.onHashChange()
		}

		this.addEvents()
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		window.addEventListener('hashchange', this.onHashChange)
	}

	/**
	 * On hash change event listener
	 * @param {Obhect} e Event data
	 */
	onHashChange(e?: HashChangeEvent): void {
		this.currentRoute = this.getRoute()

		if (e) {
			this.previousRoute = this.getPreviousRoute(e)

			if (this.previousRoute) {
				// Destroy the previous step
				this.onDestroy(this.previousRoute)

				// Create the new step on destruction callback
				this.onCreate(this.currentRoute)

				this.stepCreated = true
			}
		}

		// If destroy method was not called, create the step now
		if (!this.stepCreated) {
			this.onCreate(this.currentRoute)
		}
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
	 * Get the previous route
	 * @param {Object} event Event listener datas
	 * @returns {String} Previous route
	 */
	getPreviousRoute(e: HashChangeEvent): string | null {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null
	}

	getDynamicParameter(route: string) {
		if (route && this.currentRoute) {
			const routeFromUrlSplit = this.getRouteInArray(this.currentRoute)
			const routeFromAppSplit = this.getRouteInArray(route)
			const data: any = {}
			routeFromAppSplit.forEach((route: string, index: number) => {
				if (route.startsWith(':')) {
					data[route] = routeFromUrlSplit[index]
				}
			})
			return data
		}
	}

	getRouteInArray(route: string): Array<string> {
		if (route === '/') {
			return [route]
		} else {
			const routeSplit = route.split('/')
			routeSplit.shift()
			return routeSplit
		}
	}
}
