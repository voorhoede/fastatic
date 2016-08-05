const gulp = require('gulp');
const path = require('path');
const pump = require('pump');

/**
 * @todo logging / progress indication?
 * @todo generic success / error handling?
 */
function parser (processors) {
	return function (config) {
		console.log('Parsing', config.src + config.pattern);
		return new Promise((resolve, reject) => {
			pump([
				gulp.src(path.join(config.src, config.pattern)),
				...processors,
				gulp.dest(config.dest)
			], (err) => {
				console.log(config.pattern, err);
				if (err) {
					reject();
				} else {
					resolve();
				}
			});
		});
	}
}

module.exports = parser;
