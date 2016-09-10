'use strict';

const compareFileSize = require('./lib/compare-file-size');
const copy = require('./lib/copy');
const defineConfig = require('./lib/define-config');
const parseAll = require('./lib/parse-all');
const promisify = require('bluebird').promisify;
const remove = promisify(require('rimraf'));
const Spinner = require('cli-spinner').Spinner;

function fastatic(options) {
	const config = defineConfig(options);
	let parserErrors = [];

	const result = Promise.all([
			copy(config.src, config.temp.src),
			copy(config.src, config.temp.dest)
		])
		.then(() => parseAll(config))
		.then(errors => parserErrors = errors)
		.then(() => copy(config.temp.dest, config.dest))
		.then(() => compareFileSize(config.temp.src, config.temp.dest))
		.then(fileSize => ({
			fileSize,
			parserErrors,
			src: config.src,
			dest: config.dest
		}))
		.catch(err => {
			remove(config.temp.root);
			throw new Error('Optimising failed.');
		});

	result.then(() => remove(config.temp.root));

	return result;
}

module.exports = fastatic;
