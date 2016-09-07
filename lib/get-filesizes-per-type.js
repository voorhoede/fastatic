const fs = require('fs');
const path = require('path');

function getFileSizesPerType(files) {
	const sizes = getFileSizes(files);

	return files.reduce((typeSizes, file) => {
		const fileType = path.extname(file).replace('.', '');
		const fileSize = sizes[file];
		const totalForType = typeSizes[fileType] || 0;

		typeSizes[fileType] = totalForType + fileSize;

		return typeSizes;
	}, {});
}

function getFileSizes(files) {
	return files.reduce((sizes, file) => {
		sizes[file] = fs.statSync(file).size;
		return sizes;
	}, {});
}

module.exports = getFileSizesPerType;
