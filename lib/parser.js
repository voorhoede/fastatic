const gulp = require('gulp');
const path = require('path');
const pump = require('pump');

/**
 * @todo logging / progress indication?
 * @todo generic success / error handling?
 */
function parser (processors) {
	return function (config) {
		return new Promise((resolve, reject) => {
			pump([
				gulp.src(path.join(config.src, config.pattern)),
				...processors,
				gulp.dest(config.dest)
			], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		});
	}
}


module.exports = parser;
