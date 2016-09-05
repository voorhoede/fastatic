const fs = require('fs');
const path = require('path');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const clone = require('lodash/clone');

function results(config) {
	return glob(config.temp + '**/*', { nodir: true })
		.then(files => Promise.all(
			files.map((file) => getSizes(file, config))
		))
		.then(sizes => combineSizesPerFileType(sizes))
		.catch(err => console.log(err));
}

function getSizes(file, config) {
	return new Promise((resolve) => {
		const src = file.replace(config.temp, `${config.src}/`);
		const srcstat = fs.statSync(src);
		const tempstat = fs.statSync(file);
		const srcSize = srcstat.size;
		const optSize = tempstat.size;
		const saved = srcSize - optSize;

		resolve({
			temp: file,
			src,
			optSize,
			srcSize,
			saved
		});
	})
}

function combineSizesPerFileType(sizes) {
	const resultTemplate = { original: 0, optimized: 0, saved: 0 };
	const initialValue = {
		total: clone(resultTemplate)
	};

	return sizes.reduce((obj, size) => {
		const extRE = /(?:\.)(\w+$)/gi
		const extension = extRE.exec(size.temp)[1];

		if (!obj.hasOwnProperty(extension)) {
			obj[extension] = clone(resultTemplate);
		}

		obj[extension].original += size.srcSize;
		obj[extension].optimized += size.optSize;
		obj[extension].saved += size.saved;

		obj.total.original += size.srcSize;
		obj.total.optimized += size.optSize;
		obj.total.saved += size.saved;

		return obj;
	}, initialValue);
}

module.exports = results;
