const path = require('path')
const fs = require('fs')

const popupSvg = path.resolve(__dirname, '../web/dist/sprites/popup.svg')
const popupTemplate = path.resolve(__dirname, '../web/popup.html')

fs.readFile(popupSvg, 'utf8', (err, data) => {
	if (err) {
		console.error(err)
	}

	fs.writeFile(popupTemplate, data, { flag: 'a' }, (err) => {
		if (err) {
			console.error(err)
		}
	})
})
