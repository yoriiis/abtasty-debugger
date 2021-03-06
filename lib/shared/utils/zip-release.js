"use strict";
// Zip the directory build by webpack
const chalk = require('chalk');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const pathSrc = path.resolve(__dirname, './../../..');
const packageJson = require(`${pathSrc}/package.json`);
const archive = archiver.create('zip', {});
const output = fs.createWriteStream(path.resolve(__dirname, `${pathSrc}/${packageJson.name}.zip`));
archive.pipe(output);
archive.directory(path.resolve(__dirname, `${pathSrc}/web/dist`), false).finalize();
console.log(chalk.green('Realease created:', `${packageJson.name}.zip`));
