const gulp = require('gulp');
const path = require('path');
const pump = require('pump');
const rename = require('gulp-rename');
const rev = require('gulp-rev');

/**
 * Revisions files by appending `-fast-{hash}` to the basename of each matching file and save next to the original file.
 * `{hash}` is a unique 5 character alphanumeric [a-f0-9] string generated based on file contents.
 *
 * For example `image.jpg` will become `image-fast-cf5ba.jpg`. This means other scripts (e.g. a Service Worker) can
 * easily filter out these revisioned files using /-fast-[0-9a-f]{5}./ as a matching pattern.
 *
 * The original files are not removed as there may still be references to it (e.g. in a script w/ string concatenation).
 *
 * @param {Object} config
 * @param {String} config.dest		directory path to look for original and save revisioned files
 * @param {String} config.pattern	relative to `config.dest` to match filenames against
 * @returns {Promise}
 */
function parseRev (config) {
	return new Promise((resolve, reject) => {
		pump([
			gulp.src(path.join(config.dest, config.pattern), { base: config.dest }),
			rev(),
			rename(file => file.basename = prefixHash(file.basename)),
			gulp.dest(config.dest),
			rev.manifest({
				merge: true
			}),
			gulp.dest(config.dest)
		], (err) => err ? reject(err) : resolve())
	});
}

/**
 * Replaces hash (10 character alphanumeric [a-f0-9]) with `-fast-{hash}` (first 5 chars of original hash).
 * This ensures the string is easy to match by other scripts using /-fast-[0-9a-f]{5}/ as a pattern.
 *
 * @param {String} str		expected to contain a dash followed by a 10 character alphanumeric [a-f0-9] hash
 * @returns {String}		input string in which hash is replaced by `-fast-{hash}` (first 5 chars of original hash)
 */
function prefixHash(str) {
	const prefix = '-fast';
	return str.replace(/(-[0-9a-f]{5})[0-9a-f]{5}/, prefix + '$1');
}

module.exports = parseRev;
