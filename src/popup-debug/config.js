import '../popup/config'
import fixturesAbtasty from 'shared/assets/fixtures/abtasty.json'
import Empty from 'shared/empty/assets/scripts/empty'
import Popup from '../popup/assets/scripts/popup'
import Detail from '../popup/components/detail/assets/scripts/detail'
import List from '../popup/components/list/assets/scripts/list'

const popup = new Popup({
	data: JSON.parse(fixturesAbtasty),
	instances: [List, Detail, Empty]
})
popup.init()
