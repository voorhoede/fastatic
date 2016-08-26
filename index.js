const copy = require('./lib/copy');
const defineConfig = require('./lib/define-config');
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

	copy(config.src, config.temp)
	.then(() => parseAll(config))
	.then(() => stats(config))
	.then(output => console.log(output))
	.then(() => loader.stop())
	.then(() => copy(config.temp, config.dest))
	.catch(err => console.log('error', err)) // if anything goes wrong, we skip all steps, catch errors and remove temp
	.then(() => remove(config.temp))
	.then(() => console.log('Done. Optimised static files in', config.dest));
}

module.exports = fastatic;
