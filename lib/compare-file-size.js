'use strict';

const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const getFileSizesPerType = require('./get-filesizes-per-type');

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

function appendDirToFiles(dir, files) {
	return files.map(file => `${dir}/${file}`);
}


module.exports = compareFileSize;
