'use strict';

const getFileSizesPerType = require('./get-filesizes-per-type');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const path = require('path');

function compareFileSize(srcDir, destDir) {
	return glob('**/*', { nodir: true, cwd: srcDir })
		.then(files => {
			const srcFiles = files.map(file => path.join(srcDir, file));
			const destFiles = files.map(file => path.join(destDir, file));
			return {
				src: getFileSizesPerType(srcFiles),
				dest: getFileSizesPerType(destFiles)
			}
		})
}

module.exports = compareFileSize;
