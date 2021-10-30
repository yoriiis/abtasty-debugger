import validateTarget from 'validate-target'
import Router from 'shared/utils/router'
import DataManager from 'shared/utils/data-manager'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'
import {
	Data,
	FormattedData,
	VariationEndpoint,
	Modification
} from 'shared/assets/interfaces/interfaces'
import mockVariations from 'shared/assets/fixtures/abtasty-variations.json'

export default class Popup {
	data: Data
	app: Element
	dataManager: any
	router: any
	instances: Array<any>
	instancesResult: Array<any>
	formattedData: null | FormattedData
	currentVariation: null | VariationEndpoint

	constructor({ data, instances = [] }: { data: Data; instances: Array<any> }) {
		this.data = data
		this.instances = instances
		this.instancesResult = []
		this.formattedData = null
		this.currentVariation = null

		// @ts-ignore
		this.app = document.querySelector('#app')

		this.onDestroy = this.onDestroy.bind(this)
		this.onCreate = this.onCreate.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)
		this.onTabsUpdated = this.onTabsUpdated.bind(this)
		this.disableQa = this.disableQa.bind(this)

		this.dataManager = new DataManager()
		this.router = new Router({
			onDestroy: this.onDestroy,
			onCreate: this.onCreate
		})
	}

	/**
	 * Initialize the popup
	 */
	init() {
		if (this.data && this.data.results) {
			this.formattedData = this.dataManager.getFormattedData(this.data)
		}

		this.instancesResult = this.analyzeInstance()
		this.router.init({ isNotFound: this.isNotFound() })
		this.addEvents()
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
	 * Check if the not found route need to be display
	 * @returns {Boolean} Display the not found route
	 */
	isNotFound() {
		return !this.data || !this.data.results || Object.keys(this.data.results).length === 0
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)

		if (isExtensionMode) {
			namespace.tabs.onUpdated.addListener(this.onTabsUpdated.bind(this))
		}
	}

	onTabsUpdated(tabId: number, changeInfo: { status: string }, tab: any) {
		if (changeInfo.status === 'complete') {
			if (this.currentVariation !== null) {
				sendMessage({
					action: 'setVariation',
					data: this.currentVariation
				})
			}
		}
	}

	/**
	 * On click event listener on the app
	 * @param {Object} e Event data
	 */
	onClickOnApp(e: Event) {
		const target = e.target
		const validateTargetCollapseButton = validateTarget({
			target: target,
			selectorString: '.collapse-headerButton',
			nodeName: ['button']
		})
		const validateTargetActivateVariation = validateTarget({
			target: target,
			selectorString: '.activate-variation',
			nodeName: ['button']
		})
		const validateTargetDisableQA = validateTarget({
			target: target,
			selectorString: '.disable-qa',
			nodeName: ['button']
		})

		if (validateTargetCollapseButton) {
			this.toggleCollapse(e)
		} else if (validateTargetActivateVariation) {
			this.activateVariation(e)
		} else if (validateTargetDisableQA) {
			this.disableQa(e)
		}
	}

	/**
	 * Toggle collapse content
	 * @param {Object} e Event data
	 */
	toggleCollapse(e: Event) {
		const target = e.target
		// @ts-ignore
		target.closest('.collapse').classList.toggle('active')
	}

	activateVariation(e: Event) {
		const target = e.target as HTMLElement
		const identifier = target.getAttribute('data-identifier')
		const testId = target.getAttribute('data-test-id')
		const variationId = target.getAttribute('data-variation-id')
		const urlAPI = `https://try.abtasty.com/${identifier}/${testId}.${variationId}.json?${new Date().getTime()}`
		console.log(mockVariations)
		fetch(urlAPI, {
			method: 'GET',
			credentials: 'same-origin'
		}).then((response) => {
			response.json().then((data: VariationEndpoint) => {
				console.log(data)
				this.currentVariation = {
					// modifications: data.modifications,
					modifications: JSON.parse(mockVariations).modifications,
					globalCode: this.data.accountData.tests[testId].globalCode
				}

				if (isExtensionMode) {
					namespace.declarativeNetRequest.updateEnabledRulesets({
						enableRulesetIds: ['abtasty']
					})

					namespace.tabs.reload()
				}
			})
		})
	}

	disableQa(e: Event) {
		e.preventDefault()
		namespace.declarativeNetRequest.updateEnabledRulesets(
			{
				disableRulesetIds: ['abtasty']
			},
			() => {
				namespace.tabs.reload()
			}
		)
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
