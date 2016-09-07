const compareFileSize = require('./lib/compare-file-size');
const copy = require('./lib/copy');
const defineConfig = require('./lib/define-config');
const Logger = require('./lib/logger');
const parseAll = require('./lib/parse-all');
const promisify = require('bluebird').promisify;
const remove = promisify(require('rimraf'));
const Spinner = require('cli-spinner').Spinner;
const stats = require('./lib/parser-stats');
const spread = require('lodash/spread');

function fastatic(options) {
	const config = defineConfig(options);
	const logger = new Logger(options.logLevel);

	const result = Promise.all([
				copy(config.src, config.temp.src),
				copy(config.src, config.temp.dest)
			])
		.then(() => parseAll(config))
		.then(() => copy(config.temp.dest, config.dest))
		.then(() => stats(config))
		.then(output => logger.log(output))
		.then(() => Promise.all([
				compareFileSize(config.temp.src, config.temp.dest)
			]))
		.then(spread((fileSize) => ({fileSize})))
		.catch(err => {
			remove(config.temp.root);
			throw new Error('Optimising failed.');
		});

	result
		.then(() => remove(config.temp.root));

	return result;
}

module.exports = fastatic;
