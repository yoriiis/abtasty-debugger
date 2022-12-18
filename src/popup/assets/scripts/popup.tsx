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
	element: Element
	dataManager: any
	app!: any

	constructor({ data }: { data: Data }) {
		this.data = data

		this.element = document.querySelector('#app') as HTMLElement

		this.onTabUpdated = this.onTabUpdated.bind(this)

		this.dataManager = new DataManager()
	}

	/**
	 * Initialize the popup
	 */
	init() {
		this.app = new App({
			target: this.element as HTMLElement,
			routes: [
				{
					path: '/list',
					component: List,
					props: {
						data: this.data,
						dataManager: this.dataManager
					}
				},
				{
					path: '/detail/:testId',
					component: Detail,
					props: {
						data: this.data,
						dataManager: this.dataManager
					}
				},
				{
					path: '/empty',
					component: Empty,
					props: {
						hasData: !!(this.data && this.data.results)
					}
				}
			]
		})

		this.setRedirection()
		this.addEvents()
	}

	/**
	 * Set redirection
	 */
	setRedirection() {
		if (!(this.data && this.data.results)) {
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
	onTabUpdated(tabId: number, changeInfo: ChangeInfo, tab: any) {
		const debugMode = document.querySelector('#debugMode')
		if (debugMode && debugMode.hasAttribute('disabled') && changeInfo.status === 'complete') {
			debugMode.removeAttribute('disabled')
		}
	}
}
