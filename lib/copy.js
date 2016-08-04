const fse = require('fs-extra');

function copy (src, dest, options) {
	return new Promise((resolve, reject) => {
		try {
			fse.copySync(src, dest, options);
			resolve();
		} catch(err) {
			reject(err);
		}
	});
}

module.exports = copy;
