'use strict';

const getFileSizesPerType = require('./get-filesizes-per-type');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const path = require('path');

function compareFileSize(sourceFolder, tempFolder) {
	return glob('**/*', { nodir: true, cwd: sourceFolder })
		.then(files => {
			const sourceFiles = files.map(file => path.join(sourceFolder, file));
			const tempFiles = files.map(file => path.join(tempFolder, file));
			return {
				src: getFileSizesPerType(sourceFiles),
				dest: getFileSizesPerType(tempFiles)
			}
		})
}

module.exports = compareFileSize;
