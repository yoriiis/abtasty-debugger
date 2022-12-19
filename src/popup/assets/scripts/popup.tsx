import DataManager from 'shared/utils/data-manager'
import { isExtensionMode, namespace } from 'shared/utils/bridge'
import { Data, ChangeInfo } from 'shared/assets/interfaces/interfaces'
import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'

import { App, navigate } from 'costro'

declare global {
	interface Window {
		ABTasty: {
			clearAllCookies: () => void
		}
	}
}

// Fix innerHTML attribute with jsx-dom and TS
declare module 'react' {
	interface HTMLAttributes<T> extends DOMAttributes<T> {
		innerHTML?: any
	}
}

export default class Popup {
	data: Data
	element: Element
	redirectToEmpty: boolean
	dataManager: any
	app!: any

	constructor({ data }: { data: Data }) {
		this.data = data

		this.element = document.querySelector('#app') as HTMLElement
		this.redirectToEmpty = false

		this.onTabUpdated = this.onTabUpdated.bind(this)

		this.dataManager = new DataManager()
	}

	/**
	 * Initialize the popup
	 */
	init() {
		this.redirectToEmpty = this.isEmpty()

		this.app = new App({
			target: this.element as HTMLElement,
			routes: [
				{
					path: '/list',
					component: List,
					props: {
						hasData: !this.redirectToEmpty,
						data: this.data,
						dataManager: this.dataManager
					}
				},
				{
					path: '/detail/:testId',
					component: Detail,
					props: {
						hasData: !this.redirectToEmpty,
						data: this.data,
						dataManager: this.dataManager
					}
				},
				{
					path: '/empty',
					component: Empty,
					props: {
						hasData: !this.redirectToEmpty
					}
				}
			]
		})

		this.setRedirection()
		this.addEvents()
	}

	/**
	 * Check if no result is found
	 * @returns {Boolean} No result found
	 */
	isEmpty(): boolean {
		return !this.data || !this.data.results || Object.keys(this.data.results).length === 0
	}

	/**
	 * Set redirection
	 */
	setRedirection() {
		if (this.redirectToEmpty) {
			navigate('/empty')
		} else if (['/', '/empty'].includes(this.app.location.currentPath)) {
			navigate('/list')
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		isExtensionMode && namespace.tabs.onUpdated.addListener(this.onTabUpdated)
	}

	/**
	 * On tab updates event listener
	 * @param {Number} tabId Tab ID
	 * @param {Object} changeInfo Updated data (status)
	 * @param {Object} tab Tab data
	 */
	onTabUpdated(tabId: number, changeInfo: ChangeInfo) {
		const debugMode = document.querySelector('#debugMode')
		if (debugMode && debugMode.hasAttribute('disabled') && changeInfo.status === 'complete') {
			debugMode.removeAttribute('disabled')
		}
	}
}
