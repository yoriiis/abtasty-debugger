import '../popup/config.js'
import fixturesAbtasty from 'shared/assets/fixtures/abtasty.json'
import Empty from 'shared/empty/assets/scripts/empty.js'
import Popup from '../popup/assets/scripts/popup.js'
import Detail from '../popup/components/detail/assets/scripts/detail.js'
import List from '../popup/components/list/assets/scripts/list.js'

const popup = new Popup({
	data: JSON.parse(fixturesAbtasty),
	instances: [List, Detail, Empty]
})
popup.init()
