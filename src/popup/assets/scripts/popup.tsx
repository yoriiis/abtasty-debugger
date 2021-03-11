import { createElement } from 'jsx-dom'
import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import validateTarget from 'validate-target'
import Router from 'shared/utils/router'
import DataManager from 'shared/utils/data-manager'
import { Data, SortedData } from 'shared/assets/interfaces/interfaces'

export default class Popup {
	data: Data;
	app: Element;
	dataManager: any;
	router: any;
    instancesResult: Array<any>;

	routes: {
		[key: string]: {
			path: string;
			template: Function;
		};
	} | undefined;

	constructor({ data }: {data: Data}) {
		this.data = data

		// @ts-ignore
		this.app = document.querySelector('#app')

		this.onDestroy = this.onDestroy.bind(this)
		this.onCreate = this.onCreate.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)

		this.dataManager = new DataManager()
		this.router = new Router({
			is404: !this.data,
			onDestroy: this.onDestroy,
			onCreate: this.onCreate
		})

		const instances = [List, Detail, Empty]
		// const instances = [Detail]
		this.instancesResult = this.analyzeInstance(instances)
	}

	analyzeInstance(instances: Array<any>): Array<any> {
		return instances.map(Instance => {
			const instance = new Instance()
			instance.requestDynamicParameter = (route: string) => this.router.getDynamicParameter(route)
			instance.requestData = () => this.data
			instance.requestDataManager = () => this.dataManager
			return instance
		})
	}

	/**
	 * Initialize the popup
	 */
	init() {
		this.router.init()
		this.addEvents()
	}

	/**
	 * Destroy step
	 * @param {String} route Route of the step to destroy
	 */
	onDestroy(route: string) {
		const instance = this.getInstanceFromRoute(route)
		const element = this.app.querySelector(instance.selector)
		element && this.removeElement(element)
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
		this.app.appendChild(instance.render())
	}

	getInstanceFromRoute(route: string) {
		const routeFromUrlSplit = this.getRouteInArray(route)
		return this.instancesResult.find(instance => {
			const routeFromAppSplit = this.getRouteInArray(instance.route)
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
}
