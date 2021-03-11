import { createElement } from 'jsx-dom'
import ListTemplate from '../../components/list/assets/scripts/list'
import DetailTemplate from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import validateTarget from 'validate-target'
import DataManager from 'shared/utils/data-manager'
import { Data, SortedData } from 'shared/assets/interfaces/interfaces'

export default class Popup {
	data: Data;
	currentRoute: null | string;
	previousRoute: null | string;
	defaultRoute: string;
	stepCreated: Boolean;
	app: Element;
	dataManager: any;
	sortedData: SortedData;

	routes: {
		[key: string]: {
			path: string;
			template: Function;
		};
	} | undefined;

	constructor({ data }: {data: Data}) {
		this.data = data
		this.currentRoute = null
		this.previousRoute = null
		this.defaultRoute = '/'
		this.stepCreated = false
		// @ts-ignore
		this.app = document.querySelector('#app')
		this.hashChanged = this.hashChanged.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)

		if (this.data) {
			this.dataManager = new DataManager({ data })
			this.sortedData = this.dataManager.getSortedData()

			this.routes = {
				home: {
					path: '/',
					template: () => <ListTemplate data={this.sortedData.testsSortedByStatus} />
				},
				detail: {
					path: '/detail/:id',
					template: (dynamicData: any) => <DetailTemplate
						id={dynamicData[':id']}
						result={this.data.results[dynamicData[':id']]}
						targetingSorted={this.sortedData.targetingsSortedByStatus[dynamicData[':id']]}
						targetingMode={this.data.accountData.tests[dynamicData[':id']].targetingMode}
					/>
				},
				empty: {
					path: '/empty',
					template: () => <Empty />
				}

			}
		}
	}

	/**
	 * Initialize the popup
	 */
	init() {
		// Get current route
		const route = this.getRoute()

		// Redirect to the empty route if no data
		if (this.data === null) {
			this.defaultRoute = 'empty'
		}

		// Declare the default route
		// If route exist, keep it, else set it to the default route
		this.currentRoute = route === '' ? this.defaultRoute : route

		// Init the router with the default route
		if (route === '') {
			this.setRoute(this.currentRoute)
		} else {
			// Page started with a route, trigger hash changed
			this.hashChanged()
		}

		// this.buildDom()
		this.addEvents()
	}

	/**
	 * Get the current route
	 * @returns {String} Current route
	 */
	getRoute():string {
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
	hashChanged(e?: HashChangeEvent): void {
		this.currentRoute = this.getRoute()

		if (e) {
			this.previousRoute = this.getPreviousRoute(e)

			if (this.previousRoute) {
				// Destroy the previous step
				this.destroyStep(this.previousRoute)

				// Create the new step on destruction callback
				this.createStep(this.currentRoute)

				this.stepCreated = true
			}
		}

		// If destroy method was not called, create the step now
		if (!this.stepCreated) {
			this.createStep(this.currentRoute)
		}
	}

	/**
	 * Get the previous route
	 * @param {Object} event Event listener datas
	 * @returns {String} Previous route
	 */
	getPreviousRoute(e: HashChangeEvent): string|null {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null
	}

	/**
	 * Destroy step
	 * @param {String} route Route of the step to destroy
	 */
	destroyStep(route: string) {
		const routeKey = this.getRouteDataFromUrl(route)
		const step = this.app.querySelector(`[data-route-id="${routeKey}"]`)
		step && this.removeElement(step)
	}

	/**
	 * Remove HTML Element
	 * @param {HTMLElement} element
	 */
	removeElement(element: Element) {
		element.remove()
	}

	/**
	 * Create step
	 * @param {String} route Route of the step to create
	 */
	createStep(route: string) {
		this.app.appendChild(this.getTemplate({ route }))
	}

	/**
	 * Get template according to the route
	 * @param {Object} options
	 * @param {Object} options.route Route
	 * @returns {HTMLElement} Route template
	 */
	getTemplate({ route }: {route: string }): Element {
		const routeKey = this.getRouteDataFromUrl(route)
		const dynamicParameter = routeKey ? this.getDynamicParameter({ routeKey, route }) : {}
		console.log(routeKey)
		console.log(dynamicParameter)
		return this.routes[routeKey || 'empty'].template(dynamicParameter)
	}

	getRouteDataFromUrl(route: string): string | undefined {
		const routeFromUrlSplit = this.getRouteInArray(route)
		return Object.keys(this.routes).find((routeKey: string) => {
			const routeFromAppSplit = this.getRouteInArray(this.routes[routeKey].path)
			return routeFromAppSplit.find((routeChunk: string, index: number) => !routeChunk.startsWith(':') && routeFromUrlSplit[index] === routeChunk)
		})
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

	getDynamicParameter({ routeKey, route }: {routeKey: string, route: string}) {
		const routeFromUrlSplit = this.getRouteInArray(route)
		const routeFromAppSplit = this.getRouteInArray(this.routes[routeKey].path)
		const data:any = {}
		routeFromAppSplit.forEach((route: string, index: number) => {
			if (route.startsWith(':')) {
				data[route] = routeFromUrlSplit[index]
			}
		})
		return data
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)
		window.addEventListener('hashchange', this.hashChanged)
	}

	/**
	 * On click event listener on the app
	 * @param {Object} e Event data
	 */
	onClickOnApp(e: Event) {
		const target = e.target
		const validateTargetTargetingButton = validateTarget({
			target: target,
			selectorString: '.targeting-headerButton',
			nodeName: ['button']
		})

		if (validateTargetTargetingButton) {
			this.toggleTageting(e)
		}
	}

	/**
	 * Toggle targeting content
	 * @param {Object} e Event data
	 */
	toggleTageting(e: Event) {
		const target = e.target
		// @ts-ignore
		target.closest('.targeting').classList.toggle('active')
	}
}
