import '../popup/config.js'
import Empty from 'shared/empty/assets/scripts/empty.js'
import Popup from '../popup/assets/scripts/popup.js'
import Detail from '../popup/components/detail/assets/scripts/detail.js'
import List from '../popup/components/list/assets/scripts/list.js'

const popup = new Popup({
	data: window.ABTasty,
	instances: [List, Detail, Empty]
})
popup.init()
