'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const clone = require('lodash/clone');
const spread = require('lodash/spread');
const merge = require('lodash/merge');

function compareFileSize(config) {
	return glob('**/*', { nodir: true, cwd: config.src })
		.then(files => files.map(file => getFileSizes(file, config.src, config.temp)))
		.then(files => combineFileSizesPerType(files))
		.then(results => wrapResultsInObject(results));
}

function getFileSizes(file, srcFolder, tempFolder) {
	return {
		name: file,
		original: fs.statSync(`${srcFolder}/${file}`).size,
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

function wrapResultsInObject(results) {
	return {
		results: results
	}
}

module.exports = compareFileSize;
