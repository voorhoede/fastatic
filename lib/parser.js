const gulp = require('gulp');
const path = require('path');
const pump = require('pump');

function parser (processors) {
	return function (config) {
		return new Promise((resolve, reject) => {
			pump([
				gulp.src(path.join(config.cwd, config.pattern), { base: config.cwd }),
				...processors,
				gulp.dest(config.cwd)
			], (err) => err ? reject(err) : resolve())
		});
	}
}


module.exports = parser;
