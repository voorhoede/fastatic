'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const clone = require('lodash/clone');
const spread = require('lodash/spread');
const merge = require('lodash/merge');

function results(config) {
	return glob('**/*', { nodir: true, cwd: config.src })
		.then(files => files.map(file => getFileSizes(file, config.src, config.temp)))
		.then(files => combineFileSizesPerType(files))
		.then(sizes => addSavedBytes(sizes))
		.then(sizes => filterUntouchedSizes(sizes))
		.then(sizes => calculateTotal(sizes))
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

function addSavedBytes(sizes) {
	for (let fileType in sizes) {
		sizes[fileType].saved = sizes[fileType].original - sizes[fileType].optimized;
	}
	return sizes;
}

function filterUntouchedSizes(sizes) {
	return Object.keys(sizes).reduce((filtered, size) => {
		const sizeObj = sizes[size];
		if (sizeObj.saved) {
			filtered[size] = sizeObj;
		}
		return filtered;
	}, {});
}

function calculateTotal(sizes) {
	const total = { original: 0, optimized: 0, saved: 0};
	const sizesCopy = clone(sizes);

	Object.keys(sizes).map(fileType => {
		total.original += sizes[fileType].original ;
		total.optimized += sizes[fileType].optimized ;
		total.saved += sizes[fileType].saved ;
	});

	sizes.total = total;
	return sizes;
}

function wrapResultsInObject(results) {
	return {
		results: results
	}
}

module.exports = results;
