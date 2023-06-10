import validateTarget from 'validate-target'
import { namespace, sendMessage } from 'shared/utils/bridge'
import List from '../assets/scripts/list'

const testId = '100002'
const abtastyCookie = `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.820024.1.1.1.1.1632216664066.1632216664066.1_${testId}.200001.1.1.1.1.1632216664068.1632216664068.1`

jest.mock('validate-target')
jest.mock('shared/utils/bridge', () => {
	return {
		sendMessage: jest.fn().mockImplementation(({ action, data, callback }) => {
			let response = null
			if (action === 'getCookie' && data.name === 'ABTasty') {
				response = abtastyCookie
			}
			callback instanceof Function && callback(response)
		}),
		isExtensionMode: true,
		namespace: {
			tabs: {
				onUpdated: {
					addListener: jest.fn()
				},
				reload: jest.fn()
			}
		}
	}
})

let list
const getInstance = () => new List()

beforeEach(() => {
	document.body.append(
		<div className="list">
			<ul className="list-nav">
				<li className="list-navItem">
					<button className="list-navItemButton clearCookies">
						<div className="list-navItemButtonIcon"></div>
						Reload tag
					</button>
				</li>
				<li className="list-navItem">
					<label
						htmlFor="debugMode"
						className="list-navItemLabel"
						title="See DevTools > Console for debug logs"
					>
						Debug mode
					</label>
					<div className="customCheckbox">
						<input
							type="checkbox"
							value="false"
							className="customCheckbox-input"
							id="debugMode"
							name="debug"
						/>
						<span className="customCheckbox-round">
							<div className="customCheckbox-roundIcon"></div>
						</span>
					</div>
				</li>
			</ul>
		</div>
	)

	Object.defineProperty(window, 'location', {
		writable: true,
		value: {
			reload: jest.fn()
		}
	})
	Object.defineProperty(window, 'close', {
		writable: true,
		value: jest.fn()
	})

	list = getInstance()
})

afterEach(() => {
	document.body.innerHTML = ''
	jest.clearAllMocks()
})

describe('List', () => {
	describe('afterRender', () => {
		it('Should call the afterRender function', () => {
			list.addEvents = jest.fn()

			list.afterRender()

			expect(list.element).toBe(document.querySelector('.list'))
			expect(list.addEvents).toHaveBeenCalled()
		})

		it('Should call the afterRender function without element', () => {
			list.addEvents = jest.fn()

			document.querySelector('.list').remove()
			list.afterRender()

			expect(list.element).toBe(null)
			expect(list.addEvents).not.toHaveBeenCalled()
		})
	})

	describe('addEvents', () => {
		it('Should call the addEvents function with element', () => {
			list.element = document.querySelector('.list')
			list.element.addEventListener = jest.fn()

			list.addEvents()

			expect(list.element.addEventListener).toHaveBeenCalledWith(
				'click',
				list.onClickOnElement
			)
			expect(list.element.addEventListener).toHaveBeenCalledWith(
				'change',
				list.onChangeOnElement
			)
		})
	})

	describe('onClickOnElement', () => {
		beforeEach(() => {
			list.clearCookies = jest.fn()
		})

		it('Should call the onClickOnElement function with the clear cookie button', () => {
			const target = document.querySelector('.clearCookies')
			validateTarget.mockReturnValueOnce(true)

			list.onClickOnElement({
				target
			})

			expect(validateTarget).toHaveBeenCalledWith({
				target,
				selectorString: '.clearCookies',
				nodeName: ['button']
			})
			expect(list.clearCookies).toHaveBeenCalled()
		})

		it('Should call the onClickOnElement function with no valid element', () => {
			const target = document.querySelector('.clearCookies')
			validateTarget.mockReturnValueOnce(false)

			list.onClickOnElement({
				target
			})

			expect(validateTarget).toHaveBeenCalledWith({
				target,
				selectorString: '.clearCookies',
				nodeName: ['button']
			})
			expect(list.clearCookies).not.toHaveBeenCalled()
		})
	})

	describe('List onChangeOnElement', () => {
		it('Should call the onChangeOnElement function with the debug mode button', () => {
			list.toggleDebugMode = jest.fn()

			const target = document.querySelector('#debugMode')
			validateTarget.mockReturnValueOnce(true)

			list.onChangeOnElement({
				target
			})

			expect(validateTarget).toHaveBeenCalledWith({
				target,
				selectorString: '#debugMode',
				nodeName: ['input']
			})
			expect(list.toggleDebugMode).toHaveBeenCalled()
		})

		it('Should call the onChangeOnElement function with no valid element', () => {
			list.toggleDebugMode = jest.fn()

			const target = document.querySelector('body')
			validateTarget.mockReturnValueOnce(false)
			list.onChangeOnElement({
				target
			})

			expect(list.toggleDebugMode).not.toHaveBeenCalled()
		})
	})

	describe('List clearCookies', () => {
		it('Should call the clearCookies function', () => {
			const target = document.querySelector('.clearCookies')
			const event = {
				preventDefault: jest.fn(),
				target
			}

			list.clearCookies(event)

			expect(event.preventDefault).toHaveBeenCalled()
			expect(sendMessage).toHaveBeenCalledWith({
				action: 'clearAbtastyCookies'
			})
			expect(namespace.tabs.reload).toHaveBeenCalled()
			expect(window.close).toHaveBeenCalled()
		})
	})

	describe('List toggleDebugMode', () => {
		it('Should call the toggleDebugMode function', () => {
			const target = document.querySelector('#debugMode')
			const event = {
				target
			}

			target.setAttribute = jest.fn()

			list.toggleDebugMode(event)

			expect(target.setAttribute).toHaveBeenCalledWith('disabled', '')
			expect(sendMessage).toHaveBeenCalledWith({
				action: 'removeCookie',
				data: {
					name: 'abTastyDebug',
					value: false
				}
			})
			expect(namespace.tabs.reload).toHaveBeenCalled()
		})

		it('Should call the toggleDebugMode function with the debug mode already enabled', () => {
			const target = document.querySelector('#debugMode')
			const event = {
				target
			}

			target.setAttribute = jest.fn()

			target.checked = true
			list.toggleDebugMode(event)

			expect(target.setAttribute).toHaveBeenCalledWith('disabled', '')
			expect(sendMessage).toHaveBeenCalledWith({
				action: 'setStorage',
				data: {
					name: 'abTastyDebug',
					value: true
				}
			})
			expect(namespace.tabs.reload).toHaveBeenCalled()
		})
	})
})
