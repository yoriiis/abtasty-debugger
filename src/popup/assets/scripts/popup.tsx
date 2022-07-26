import validateTarget from 'validate-target'
import Router from 'shared/utils/router'
import DataManager from 'shared/utils/data-manager'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'
import { Data, FormattedData, ChangeInfo } from 'shared/assets/interfaces/interfaces'

declare global {
	interface Window {
		ABTasty: {
			clearAllCookies: Function
		}
	}
}

// Fix innerHTML attribute with jsx-dom and TS
declare module 'react' {
	interface HTMLAttributes<T> {
		innerHTML?: any
	}
}

export default class Popup {
	data: Data
	app: Element
	dataManager: any
	router: any
	instances: Array<any>
	instancesResult: Array<any>
	formattedData: null | FormattedData

	constructor({ data, instances = [] }: { data: Data; instances: Array<any> }) {
		this.data = data
		this.instances = instances
		this.instancesResult = []
		this.formattedData = null

		// @ts-ignore
		this.app = document.querySelector('#app')

		this.onDestroy = this.onDestroy.bind(this)
		this.onCreate = this.onCreate.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)
		this.onChangeOnApp = this.onChangeOnApp.bind(this)
		this.onTabUpdated = this.onTabUpdated.bind(this)

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
	isNotFound(): boolean {
		return !this.data || !this.data.results || Object.keys(this.data.results).length === 0
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)

		if (isExtensionMode) {
			this.app.addEventListener('change', this.onChangeOnApp)
			namespace.tabs.onUpdated.addListener(this.onTabUpdated)
		}
	}

	/**
	 * On click event listener on the app
	 * @param {Event} e Event data
	 */
	onClickOnApp(e: Event) {
		const target = e.target
		const validateTargetCollapseButton = validateTarget({
			target: target,
			selectorString: '.collapse-headerButton',
			nodeName: ['button']
		})
		const validateTargetRetry = validateTarget({
			target: target,
			selectorString: '.empty-retryButton',
			nodeName: ['button']
		})
		const validateTargetclearCookies = validateTarget({
			target: target,
			selectorString: '.clearCookies',
			nodeName: ['button']
		})

		if (validateTargetCollapseButton) {
			this.toggleCollapse(e)
		} else if (validateTargetRetry) {
			this.retry(e)
		} else if (validateTargetclearCookies && isExtensionMode) {
			this.clearCookies(e)
		}
	}

	/**
	 * Toggle collapse content
	 * @param {Event} e Event data
	 */
	toggleCollapse(e: Event) {
		const target = e.target as HTMLElement

		if (target.closest('.collapse.headerOnly')) {
			return
		}

		// @ts-ignore
		target.closest('.collapse').classList.toggle('active')
	}

	/**
	 * Retry and reload the popup if no results
	 * @param {Event} e Event data
	 */
	retry(e: Event) {
		e.preventDefault()

		window.location.reload()
	}

	/**
	 * Retry and reload the popup if no results
	 * @param {Event} e Event data
	 */
	clearCookies(e: Event) {
		e.preventDefault()

		sendMessage({
			action: 'clearAbtastyCookies'
		})
		namespace.tabs.reload()
		window.close()
	}

	/**
	 * On change event listener on the app
	 * @param {Event} e Event data
	 */
	onChangeOnApp(e: Event) {
		const target = e.target
		const validateTargetSwitchVariation = validateTarget({
			target: target,
			selectorString: '.variation-inputRadio',
			nodeName: ['input']
		})
		const validateTargeDebugMode = validateTarget({
			target: target,
			selectorString: '#debugMode',
			nodeName: ['input']
		})

		if (validateTargetSwitchVariation) {
			this.switchVariation(e)
		} else if (validateTargeDebugMode) {
			this.toggleDebugMode(e)
		}
	}

	/**
	 * Switch variation
	 * @param {Event} e Event data
	 */
	switchVariation(e: Event) {
		const target = e.target as HTMLInputElement
		const newVariationId = parseInt(target.value)
		const testId = target.getAttribute('data-test-id') as string

		sendMessage({
			action: 'getCookie',
			data: {
				name: 'ABTasty'
			},
			callback: (response: string) => {
				if (response) {
					const thValue = response.split('&').find((item: string) => item.includes('th='))

					if (thValue) {
						const currentVariationId = thValue.match(
							new RegExp(`${testId}.(-?[0-9]*).`)
						)

						if (currentVariationId && currentVariationId.length) {
							const thValueUpdated = thValue.replace(
								`.${currentVariationId[1]}`,
								`.${newVariationId}`
							)
							response = response.replace(thValue, thValueUpdated)

							sendMessage({
								action: 'setStorage',
								data: {
									name: 'ABTasty',
									value: response,
									syncWithLocalStorage: true
								}
							})
							namespace.tabs.reload()

							// Update the data with the new variation ID
							// Useful if the detail view is re-rendered after updating the variation
							this.data.results[testId].variationID = newVariationId
						}
					}
				}
			}
		})
	}

	/**
	 * Toggle debug mode
	 * @param {Event} e Event data
	 */
	toggleDebugMode(e: Event) {
		const target = e.target as HTMLInputElement

		target.setAttribute('disabled', '')

		sendMessage({
			action: target.checked ? 'setStorage' : 'removeCookie',
			data: {
				name: 'abTastyDebug',
				value: target.checked
			}
		})
		namespace.tabs.reload()
	}

	/**
	 * On tab updates event listener
	 * @param {Number} tabId Tab ID
	 * @param {Object} changeInfo Updated data (status)
	 * @param {Object} tab Tab data
	 */
	onTabUpdated(tabId: number, changeInfo: ChangeInfo, tab: any) {
		const debugMode = document.querySelector('#debugMode')
		if (debugMode && debugMode.hasAttribute('disabled') && changeInfo.status === 'complete') {
			debugMode.removeAttribute('disabled')
		}
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
