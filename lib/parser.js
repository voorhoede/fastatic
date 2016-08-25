const gulp = require('gulp');
const path = require('path');
const pump = require('pump');

function parser (processors) {
	return function (config) {
		return new Promise((resolve, reject) => {
			pump([
				gulp.src(path.join(config.src, config.pattern), { base: config.src }),
				...processors,
				gulp.dest(config.dest)
			], (err) => err ? reject(err) : resolve())
		});
	}
}


module.exports = parser;
