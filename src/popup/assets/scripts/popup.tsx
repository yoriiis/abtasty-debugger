import validateTarget from 'validate-target'
import DataManager from 'shared/utils/data-manager'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'
import { Data, ChangeInfo } from 'shared/assets/interfaces/interfaces'
import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'

import { App, navigate } from 'costro'

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

	constructor({ data }: { data: Data }) {
		this.data = data

		// @ts-ignore
		this.app = document.querySelector('#app')

		this.onTabUpdated = this.onTabUpdated.bind(this)

		this.dataManager = new DataManager()
	}

	/**
	 * Initialize the popup
	 */
	init() {
		if (this.app) {
			const app = new App({
				target: this.app as HTMLElement,
				routes: [
					{
						path: '/list',
						component: List,
						props: {
							testsSortedByStatus: this.dataManager.getTestsSortedByStatus(this.data),
							debug: this.data.debug
						}
					},
					{
						path: '/detail/:testId',
						component: Detail,
						props: {
							accountData: this.data.accountData,
							results: this.data.results,
							targetingsSortedByStatus: this.dataManager.getTargetingsSortedByStatus(
								this.data
							)
						}
					},
					{
						path: '/empty',
						component: Empty
					}
				]
			})
			console.log(app, this.data)

			if (this.data && this.data.results) {
				navigate('/list')
			} else {
				navigate('/empty')
			}
		}

		this.addEvents()
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
	onTabUpdated(tabId: number, changeInfo: ChangeInfo, tab: any) {
		const debugMode = document.querySelector('#debugMode')
		if (debugMode && debugMode.hasAttribute('disabled') && changeInfo.status === 'complete') {
			debugMode.removeAttribute('disabled')
		}
	}

	/**
	 * Remove HTML Element
	 * @param {HTMLElement} element
	 */
	removeElement(element: Element) {
		element.remove()
	}
}
