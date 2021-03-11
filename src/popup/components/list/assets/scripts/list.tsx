import { createElement } from 'jsx-dom'
import Template from './templates/list'
import { TestsSortedByStatus } from 'shared/assets/interfaces/interfaces'

interface ListData {
    testsSortedByStatus: TestsSortedByStatus;
}

export default class List {
    // @ts-ignore
    requestDataManager: Function;
    // @ts-ignore
    requestData: Function;

    id = 'list';
	route = '/';
	selector = '.list';

	render() {
		return this.getTemplate(this.getData())
	}

	getData(): ListData {
		const dataManager = this.requestDataManager()
		const data = this.requestData()
		return {
			testsSortedByStatus: dataManager.getTestsSortedByStatus(data)
		}
	}

	getTemplate(data: ListData) {
		return <Template data={data} />
	}
}
