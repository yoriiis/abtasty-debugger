import { createElement } from 'costro/jsx'
import validateTarget from 'validate-target'
import { namespace, sendMessage } from 'shared/utils/bridge'
import fixturesAbtasty from '../../../../shared/assets/fixtures/abtasty.json'
import Detail from '../assets/scripts/detail'

const newVariationId = '200002'
const testId = '100002'
const abtastyCookie = `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.200001.1.1.1.1.1632216664066.1632216664066.1.2_${testId}.200001.1.1.1.1.1632216664068.1632216664068.1.2`

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

let detail

const getInstance = () => new Detail()

beforeEach(() => {
	document.body.append(
		<div className="detail">
			<div className="collapse">
				<div className="collapse-header">
					<button className="collapse-headerButton"></button>
				</div>
				<div className="collapse-content">
					<div className="variation">
						<ul className="variation-list">
							<li className="variation-listItem">
								<div className="customRadio">
									<input
										type="radio"
										value={newVariationId}
										id={`variation-${newVariationId}`}
										className="customRadio-input variation-inputRadio"
										name="variationId"
										data-test-id={testId}
										checked
									/>
									<span className="customRadio-round"></span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
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

	detail = getInstance()
})

afterEach(() => {
	document.body.innerHTML = ''
	jest.clearAllMocks()
})

describe('Detail', () => {
	describe('afterRender', () => {
		it('Should call the afterRender function', () => {
			detail.addEvents = jest.fn()

			detail.afterRender()

			expect(detail.element).toBe(document.querySelector('.detail'))
			expect(detail.addEvents).toHaveBeenCalled()
		})

		it('Should call the afterRender function without element', () => {
			detail.addEvents = jest.fn()

			document.querySelector('.detail').remove()
			detail.afterRender()

			expect(detail.element).toBe(null)
			expect(detail.addEvents).not.toHaveBeenCalled()
		})
	})

	describe('addEvents', () => {
		it('Should call the addEvents function with element', () => {
			detail.element = document.querySelector('.detail')
			detail.element.addEventListener = jest.fn()

			detail.addEvents()

			expect(detail.element.addEventListener).toHaveBeenCalledWith(
				'click',
				detail.onClickOnElement
			)
			expect(detail.element.addEventListener).toHaveBeenCalledWith(
				'change',
				detail.onChangeOnElement
			)
		})
	})

	describe('onClickOnElement', () => {
		beforeEach(() => {
			detail.toggleCollapse = jest.fn()
		})

		it('Should call the onClickOnElement function with the collapse header button', () => {
			const target = document.querySelector('.collapse-headerButton')
			validateTarget.mockReturnValueOnce(true)

			detail.onClickOnElement({
				target
			})

			expect(validateTarget).toHaveBeenCalledWith({
				target,
				selectorString: '.collapse-headerButton',
				nodeName: ['button']
			})
			expect(detail.toggleCollapse).toHaveBeenCalled()
		})

		it('Should call the onClickOnElement function with no valid element', () => {
			const target = document.querySelector('.collapse-headerButton')
			validateTarget.mockReturnValueOnce(false)

			detail.onClickOnElement({
				target
			})

			expect(validateTarget).toHaveBeenCalledWith({
				target,
				selectorString: '.collapse-headerButton',
				nodeName: ['button']
			})
			expect(detail.toggleCollapse).not.toHaveBeenCalled()
		})
	})

	describe('List onChangeOnElement', () => {
		it('Should call the onChangeOnElement function with the switch variation button', () => {
			detail.switchVariation = jest.fn()

			const target = document.querySelector('.variation-inputRadio')
			validateTarget.mockReturnValueOnce(true)

			detail.onChangeOnElement({
				target
			})

			expect(validateTarget).toHaveBeenCalledWith({
				target,
				selectorString: '.variation-inputRadio',
				nodeName: ['input']
			})
			expect(detail.switchVariation).toHaveBeenCalled()
		})

		it('Should call the onChangeOnElement function with no valid element', () => {
			detail.switchVariation = jest.fn()

			const target = document.querySelector('body')
			validateTarget.mockReturnValueOnce(false)
			detail.onChangeOnElement({
				target
			})

			expect(detail.switchVariation).not.toHaveBeenCalled()
		})
	})

	describe('Detail toggleCollapse', () => {
		it('Should call the toggleCollapse function', () => {
			const target = document.querySelector('.collapse-headerButton')

			target.closest('.collapse').classList.toggle = jest.fn()

			detail.toggleCollapse({
				target
			})

			expect(target.closest('.collapse').classList.toggle).toHaveBeenCalledWith('active')
		})

		it('Should call the toggleCollapse function with header only', () => {
			const target = document.querySelector('.collapse-headerButton')

			target.closest('.collapse').classList.toggle = jest.fn()

			document.querySelector('.collapse').classList.add('headerOnly')
			detail.toggleCollapse({
				target
			})

			expect(target.closest('.collapse').classList.toggle).not.toHaveBeenCalled()
		})
	})

	describe('Detail switchVariation', () => {
		beforeEach(() => {
			detail.props = {
				results: fixturesAbtasty.results
			}
		})

		it('Should call the switchVariation function', () => {
			const target = document.querySelector('.variation-inputRadio')
			const event = {
				target
			}

			detail.switchVariation(event)

			expect(sendMessage).toHaveBeenCalledTimes(2)
			expect(sendMessage).toHaveBeenNthCalledWith(1, {
				action: 'getCookie',
				data: {
					name: 'ABTasty'
				},
				callback: expect.any(Function)
			})
			expect(sendMessage).toHaveBeenNthCalledWith(2, {
				action: 'setStorage',
				data: {
					name: 'ABTasty',
					value: `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.200001.1.1.1.1.1632216664066.1632216664066.1.2_${testId}.${newVariationId}.1.1.1.1.1632216664068.1632216664068.1.2`,
					syncWithLocalStorage: true
				}
			})
			expect(namespace.tabs.reload).toHaveBeenCalled()
		})

		it('Should call the switchVariation function with a variation id negative', () => {
			const target = document.querySelector('.variation-inputRadio')
			const event = {
				target
			}

			const newVariationId = '-1'
			document.querySelector('.variation-inputRadio').value = newVariationId
			detail.switchVariation(event)

			expect(sendMessage).toHaveBeenCalledTimes(2)
			expect(sendMessage).toHaveBeenNthCalledWith(1, {
				action: 'getCookie',
				data: {
					name: 'ABTasty'
				},
				callback: expect.any(Function)
			})
			expect(sendMessage).toHaveBeenNthCalledWith(2, {
				action: 'setStorage',
				data: {
					name: 'ABTasty',
					value: `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.200001.1.1.1.1.1632216664066.1632216664066.1.2_${testId}.${newVariationId}.1.1.1.1.1632216664068.1632216664068.1.2`,
					syncWithLocalStorage: true
				}
			})
			expect(namespace.tabs.reload).toHaveBeenCalled()
		})

		it('Should call the switchVariation function with a variation id with more than 6 numbers', () => {
			const target = document.querySelector('.variation-inputRadio')
			const event = {
				target
			}

			const newVariationId = '123456789'
			document.querySelector('.variation-inputRadio').value = newVariationId
			detail.switchVariation(event)

			expect(sendMessage).toHaveBeenCalledTimes(2)
			expect(sendMessage).toHaveBeenNthCalledWith(1, {
				action: 'getCookie',
				data: {
					name: 'ABTasty'
				},
				callback: expect.any(Function)
			})
			expect(sendMessage).toHaveBeenNthCalledWith(2, {
				action: 'setStorage',
				data: {
					name: 'ABTasty',
					value: `uid=zed18spa36wefrnq&fst=1632216663697&pst=-1&cst=1632216663697&ns=1&pvt=1&pvis=1&th=661111.200001.1.1.1.1.1632216664066.1632216664066.1.2_${testId}.${newVariationId}.1.1.1.1.1632216664068.1632216664068.1.2`,
					syncWithLocalStorage: true
				}
			})
			expect(namespace.tabs.reload).toHaveBeenCalled()
		})
	})
})
