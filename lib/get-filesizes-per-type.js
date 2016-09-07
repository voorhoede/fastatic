const fs = require('fs');
const path = require('path');

function getFileSizesPerType(files) {
	const sizes = getFileSizes(files);

	return files.reduce((sizes, file) => {
		const type = path.extname(file).replace('.', '');
		const size = sizes[file];

		sizes[type] = (sizes[type] || 0) + size;

		return sizes;
	}, {});
}

function getFileSizes(files) {
	return files.reduce((sizes, file) => {
		sizes[file] = fs.statSync(file).size;
		return sizes;
	}, {});
}

module.exports = getFileSizesPerType;
