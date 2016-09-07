'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);

function compareFileSize(sourceFolder, tempFolder) {
	return glob('**/*', { nodir: true, cwd: sourceFolder })
		.then(files => {
			const sourceFiles = appendDirToFiles(sourceFolder, files);
			const tempFiles = appendDirToFiles(tempFolder, files);
			return {
				src: getFileSizesPerType(sourceFiles),
				dest: getFileSizesPerType(tempFiles)
			}
		})
}

function getFileSizesPerType(files) {
	const sizes = getFileSizes(files);
	return Object.keys(sizes).reduce((typeSizes, file) => {
		const fileType = path.extname(file).replace('.', '');
		const fileSize = sizes[file];

		if (!typeSizes.hasOwnProperty(fileType)) {
			typeSizes[fileType] = 0;
		}

		typeSizes[fileType] += fileSize;
		return typeSizes;
	}, {});
}

function getFileSizes(files) {
	return files.reduce((sizes, file) => {
		sizes[file] = fs.statSync(file).size;
		return sizes;
	}, {});
}

function appendDirToFiles(dir, files) {
	return files.map(file => `${dir}/${file}`);
}


module.exports = compareFileSize;
