import { createElement } from 'jsx-dom'
import Template from './templates/empty'

export default class Empty {
    id = 'empty';
	route = '/empty';
	selector = '.empty';

	render() {
		return this.getTemplate()
	}

	getTemplate() {
		return <Template />
	}
}
