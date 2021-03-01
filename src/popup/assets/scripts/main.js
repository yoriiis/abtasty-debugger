import Home from './home'
import abtasty from '../../../../abtasty.json'

window.ABTasty = abtasty

if (typeof window.ABTasty !== 'undefined') {
	const home = new Home()
	home.init()
}
