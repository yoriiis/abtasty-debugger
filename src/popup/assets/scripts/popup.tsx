import validateTarget from 'validate-target'
import Router from 'shared/utils/router'
import DataManager from 'shared/utils/data-manager'
import { Data, FormattedData } from 'shared/assets/interfaces/interfaces'

export default class Popup {
	data: Data
	app: Element
	dataManager: any
	router: any
	instances: Array<any>
	instancesResult: Array<any>
	formattedData: null | FormattedData

	constructor({ data, instances }: { data: Data; instances: Array<any> }) {
		this.data = data
		this.instances = instances
		this.instancesResult = []
		this.formattedData = null

		// @ts-ignore
		this.app = document.querySelector('#app')

		this.onDestroy = this.onDestroy.bind(this)
		this.onCreate = this.onCreate.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)

		this.dataManager = new DataManager()
		this.router = new Router({
			isNotFound: !this.data,
			onDestroy: this.onDestroy,
			onCreate: this.onCreate
		})
	}

	/**
	 * Analyze all instances and initialize them
	 * Exposes additionnals functions
	 * @param {Array} instances List of instances
	 * @returns {Array} List of instances initialized and updated
	 */
	analyzeInstance(): Array<any> {
		return this.instances.map((Instance: any) => {
			const instance = new Instance()
			instance.requestDynamicSegments = (route: string) =>
				this.router.getDynamicSegments(route)
			instance.requestData = () => this.data
			instance.requestFormattedData = () => this.formattedData
			return instance
		})
	}

	/**
	 * Initialize the popup
	 */
	init() {
		if (this.data) {
			this.formattedData = this.dataManager.getFormattedData(this.data)
		}

		this.instancesResult = this.analyzeInstance()

		if (this.instancesResult.length) {
			this.router.init()
			this.addEvents()
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)
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

	/**
	 * Destroy step
	 * @param {String} route Route of the step to destroy
	 */
	onDestroy(route: string) {
		const instance = this.getInstanceFromRoute(route)
		if (instance) {
			const element = this.app.querySelector(instance.selector)
			element && this.removeElement(element)
		}
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
	onCreate(route: string) {
		const instance = this.getInstanceFromRoute(route)
		instance && this.app.appendChild(instance.render())
	}

	/**
	 * Get instance from the route
	 * @param {String} route Route
	 * @returns {(Class|undefined)} Correpsonding instance or undefined if no result
	 */
	getInstanceFromRoute(route: string): any | undefined {
		const routeFromUrlSplit = this.router.transformRouteInArray(route)
		return (
			this.instancesResult.find((instance: any) => {
				const routeFromAppSplit = this.router.transformRouteInArray(instance.route)
				return routeFromAppSplit.find(
					(routeChunk: string, index: number) =>
						!routeChunk.startsWith(':') && routeFromUrlSplit[index] === routeChunk
				)
			}) || this.getNotFoundInstance()
		)
	}

	/**
	 * Get the not found instance in case of no instance found
	 * @returns {Class} Not found instance
	 */
	getNotFoundInstance(): any {
		return this.instancesResult.find((instance: any) => instance.route === '/empty')
	}
}
