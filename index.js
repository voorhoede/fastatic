const copy = require('./lib/copy');
const defineConfig = require('./lib/define-config');
const Logger = require('./lib/logger');
const parseAll = require('./lib/parse-all');
const promisify = require('bluebird').promisify;
const remove = promisify(require('rimraf'));
const Spinner = require('cli-spinner').Spinner;
const stats = require('./lib/parser-stats');

function fastatic(options) {
	const config = defineConfig(options);

	const loader = new Spinner(`%s Crunching ${config.src}`);
	loader.setSpinnerString(18);
	loader.start();

	const logger = new Logger(config.logLevel);

	copy(config.src, config.temp)
	.then(() => parseAll(config))
	.then(() => stats(config))
	.then(output => logger.log(output))
	.then(() => loader.stop())
	.then(() => copy(config.temp, config.dest))
	.catch(err => logger.error(err)) // if anything goes wrong, we skip all steps, catch errors and remove temp
	.then(() => remove(config.temp))
	.then(() => logger.log('Done. Optimised static files in', config.dest));
}

module.exports = fastatic;
