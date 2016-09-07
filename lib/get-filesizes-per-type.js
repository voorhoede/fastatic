const fs = require('fs');
const path = require('path');

function getFileSizesPerType(files) {
	const sizes = getFileSizes(files);

	return files.reduce((sizes, file) => {
		const type = path.extname(file).replace('.', '');
		const size = sizes[file];
		const totalForType = sizes[type] || 0;

		sizes[type] = totalForType + size;

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
