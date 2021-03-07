import '../popup/config'
import fixturesAbtasty from 'shared/assets/fixtures/abtasty.json'
import Popup from '../popup/assets/scripts/popup'

const popup = new Popup({ data: JSON.parse(fixturesAbtasty) })
popup.init()
