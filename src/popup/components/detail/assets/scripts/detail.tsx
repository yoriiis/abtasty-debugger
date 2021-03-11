import { createElement } from 'jsx-dom'
import Template from './templates/detail'
import { DynamicParameter, DetailData } from 'shared/assets/interfaces/interfaces'

export default class Detail {
    // @ts-ignore
    requestDynamicParameter: Function;
    // @ts-ignore
    requestDataManager: Function;
    // @ts-ignore
    requestData: Function;

	id = 'detail'
	route = '/detail/:id'
	selector = '.detail'

	render() {
		const dynamicParameter = this.requestDynamicParameter(this.route)
		return this.getTemplate(this.getData(dynamicParameter))
	}

	getData(dynamicParameter: DynamicParameter): DetailData {
		const dataManager = this.requestDataManager()
		const data = this.requestData()
		const id = dynamicParameter[':id']
		return {
			id,
			result: data.results[id],
			targetingSorted: dataManager.getTargetingsSortedByStatus(data)[id],
			targetingMode: data.accountData.tests[id].targetingMode
		}
	}

	getTemplate(data: DetailData) {
		return <Template data={data} />
	}
}
