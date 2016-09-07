'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const clone = require('lodash/clone');
const spread = require('lodash/spread');
const merge = require('lodash/merge');

function compareFileSize(sourceFolder, tempFolder) {
	return glob('**/*', { nodir: true, cwd: sourceFolder })
		.then(files => files.map(file => getFileSizes(file, sourceFolder, tempFolder)))
		.then(files => combineFileSizesPerType(files));
}

function getFileSizes(file, sourceFolder, tempFolder) {
	return {
		name: file,
		original: fs.statSync(`${sourceFolder}/${file}`).size,
		optimized: fs.statSync(`${tempFolder}/${file}`).size
	}
}

function combineFileSizesPerType(files) {
	return files.reduce((fileTypes, fileObj) => {
		const currentFileType = path.extname(fileObj.name).replace('.', '');

		if (!fileTypes.hasOwnProperty(currentFileType)) {
			fileTypes[currentFileType] = { original: 0, optimized: 0 };
		}

		fileTypes[currentFileType].original += fileObj.original;
		fileTypes[currentFileType].optimized += fileObj.optimized;

		return fileTypes;
	}, {});
}

module.exports = compareFileSize;
