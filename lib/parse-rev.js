const gulp = require('gulp');
const path = require('path');
const pump = require('pump');
const rename = require('gulp-rename');
const rev = require('gulp-rev');

/**
 * Revisions files by appending `-fastatic-{hash}` to the basename of each matching file and save next to the original file.
 * `{hash}` is a unique 5 character alphanumeric [a-f0-9] string generated based on file contents.
 *
 * For example `image.jpg` will become `image-fastatic-cf5ba.jpg`. This means other scripts (e.g. a Service Worker) can
 * easily filter out these revisioned files using /-fastatic-[0-9a-f]{5}./ as a matching pattern.
 *
 * The original files are not removed as there may still be references to it (e.g. in a script w/ string concatenation).
 *
 * @param {Object} config
 * @param {String} config.cwd		directory path to look for original and save revisioned files
 * @param {String} config.pattern	relative to `config.cwd` to match filenames against
 * @returns {Promise}
 */
function parseRev (config) {
	return new Promise((resolve, reject) => {
		pump([
			gulp.src(path.join(config.cwd, config.pattern), { base: config.cwd }),
			rev(),
			rename(file => file.basename = prefixHash(file.basename)),
			gulp.dest(config.cwd),
			rev.manifest((config.name || 'rev') + '-manifest.json'),
			gulp.dest(config.cwd)
		], (err) => err ? reject(err) : resolve())
	});
}

/**
 * Replaces hash (10 character alphanumeric [a-f0-9]) with `-fastatic-{hash}` (first 5 chars of original hash).
 * This ensures the string is easy to match by other scripts using /-fastatic-[0-9a-f]{5}/ as a pattern.
 *
 * @param {String} str		expected to contain a dash followed by a 10 character alphanumeric [a-f0-9] hash
 * @returns {String}		input string in which hash is replaced by `-fastatic-{hash}` (first 5 chars of original hash)
 */
function prefixHash(str) {
	const prefix = '-fastatic';
	return str.replace(/(-[0-9a-f]{5})[0-9a-f]{5}/, prefix + '$1');
}

module.exports = parseRev;
