const copy = require('./lib/copy');
const defineConfig = require('./lib/define-config');
const Logger = require('./lib/logger');
const parseAll = require('./lib/parse-all');
const promisify = require('bluebird').promisify;
const remove = promisify(require('rimraf'));
const Spinner = require('cli-spinner').Spinner;
const stats = require('./lib/parser-stats');
const compareFileSize = require('./lib/compare-file-size');

function fastatic(options) {
	const config = defineConfig(options);

	const loader = new Spinner(`%s Crunching ${config.src}`);
	loader.setSpinnerString(18);
	loader.start();

	const result = copy(config.src, config.temp)
		.then(() => parseAll(config))
		.then(() => stats(config))
		.then(output => console.log(output))
		.then(() => loader.stop())
		.then(() => compareFileSize(config.src, config.temp))
		.catch(err => {
			remove(config.temp);
			loader.stop();
			throw new Error('Optimising failed.');
		});

	result
		.then(() => copy(config.temp, config.dest))
		.then(() => remove(config.temp));

	return result;
}

module.exports = fastatic;
