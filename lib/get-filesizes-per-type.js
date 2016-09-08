const fs = require('fs');
const path = require('path');

function getFileSizesPerType(files) {
	const sizes = getFileSizes(files);

	return files.reduce((types, file) => {
		const type = path.extname(file).replace('.', '');
		const size = sizes[file];

		types[type] = (types[type] || 0) + size;

		return types;
	}, {});
}

function getFileSizes(files) {
	return files.reduce((sizes, file) => {
		sizes[file] = fs.statSync(file).size;
		return sizes;
	}, {});
}

module.exports = getFileSizesPerType;
