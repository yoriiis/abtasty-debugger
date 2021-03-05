const fs = require('fs')
const archiver = require('archiver')
const path = require('path')
const packageJson = require('../package.json')

const archive = archiver.create('zip', {})
const output = fs.createWriteStream(path.resolve(__dirname, `${packageJson.name}.zip`))

archive.pipe(output)

archive.directory(path.resolve(__dirname, '../web/dist'), false).finalize()
