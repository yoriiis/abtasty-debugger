import { createElement } from 'jsx-dom'
import List from 'shared/list/assets/scripts/list'
import View from 'shared/view/assets/scripts/view'
import Empty from 'shared/empty/assets/scripts/empty'
import validateTarget from 'validate-target'

export default class Popup {
	constructor({ data = null } = {}) {
		this.data = data
		this.defaultRoute = 'list'
		this.app = document.querySelector('#app')
		this.hashChanged = this.hashChanged.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)
		console.log(data)
		this.templates = {
			empty: () => <Empty />,
			list: () => <List data={data} />,
			view: (id) => (
				<View id={id} result={data.results[id]} test={data.accountData.tests[id]} />
			)
		}
	}

	init() {
		// Get current route
		const route = this.getRoute()

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

	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)
		window.addEventListener('hashchange', this.hashChanged, false)
	}

	hashChanged(e) {
		this.currentRoute = this.getRoute()

		if (this.data === null) {
			this.setRoute('empty')
		}

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

	createStep(route) {
		const viewId = this.getIdFromRoute(this.currentRoute) || null
		const routeSection = this.getRouteSection(route)
		document.querySelector('#app').appendChild(this.templates[routeSection](viewId))
	}

	destroyStep(route) {
		const routeSection = this.getRouteSection(route)
		this.app.querySelector(`[data-route-id="${routeSection}"]`).remove()
	}

	/**
	 * Get the current route
	 *
	 * @returns {Array} Current route
	 */
	getRoute() {
		return window.location.hash.substr(1)
	}

	getRouteSection(route) {
		return route.split('/')[0]
	}

	/**
	 * Get the previous route
	 *
	 * @param {Object} event Event listener datas
	 *
	 * @returns {String} Previous route
	 */
	getPreviousRoute(e) {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null
	}

	getIdFromRoute(route) {
		return route.split('view/')[1]
	}

	/**
	 * Set the route
	 *
	 * @returns {String} route New value for the route
	 */
	setRoute(route) {
		window.location.hash = route
	}

	onClickOnApp(e) {
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

	toggleTageting(e) {
		const target = e.target
		target.closest('.targeting').classList.toggle('active')
	}
}
