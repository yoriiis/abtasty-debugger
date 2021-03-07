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

	templates: {
		[key: string]: Function;
	}

	constructor({ data }: {data: Data}) {
		this.data = data
		this.currentRoute = null
		this.previousRoute = null
		this.defaultRoute = 'list'
		this.stepCreated = false
		// @ts-ignore
		this.app = document.querySelector('#app')
		this.hashChanged = this.hashChanged.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)

		this.dataManager = new DataManager({ data })
		this.sortedData = this.dataManager.getSortedData()

		this.templates = {
			list: () => <ListTemplate data={this.sortedData.testsSortedByStatus} />,
			detail: (id: string) =>
				<DetailTemplate
					id={id}
					result={this.data.results[id]}
					targetingSorted={this.sortedData.targetingsSortedByStatus[id]}
					targetingMode={this.data.accountData.tests[id].targetingMode}
				/>,
			empty: () => <Empty />

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
		const routeSection = this.getRouteSection(route)
		const step = this.app.querySelector(`[data-route-id="${routeSection}"]`)
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
		const testId = this.getTestIdFromRoute(route)
		const routeSection = this.getRouteSection(route)
		this.app.appendChild(this.getTemplate({ routeSection, testId }))
	}

	/**
     * Get template according to the route
     * @param {Object} options
     * @param {Object} options.routeSection Route section
     * @param {Object} options.testId View ID
     * @returns {HTMLElement} Route template
     */
	getTemplate({ routeSection, testId }: {routeSection: string, testId: string|null }): Element {
		return this.templates[routeSection](testId)
	}

	/**
	 * Get the current route section (view/000001 => view)
	 * @param {String} route Route
	 * @returns {String} Current route section
	 */
	getRouteSection(route: string):string {
		return route.split('/')[0]
	}

	/**
	 * Get id from route
	 * @param {String} route  Route
	 * @returns {String} Detail id
	 */
	getTestIdFromRoute(route: string|null): string|null {
		return route ? route.split('detail/')[1] : null
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
