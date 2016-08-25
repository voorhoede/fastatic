const copy = require('./lib/copy');
const merge = require('lodash/merge');
const parseAll = require('./lib/parse-all');
const promisify = require('bluebird').promisify;
const remove = promisify(require('rimraf'));
const Spinner = require('cli-spinner').Spinner;
const stats = require('./lib/parser-stats');

const defaults = {
	src: './',
	dest: undefined,
	temp: './.fastatic-temp/',
	parsers: {
		cssmin: {
			pattern: '**/*.css',
			parser: require('./lib/parse-cssmin')
		},
		htmlmin: {
			pattern: '**/*.html',
			parser: require('./lib/parse-htmlmin')
		},
		imagemin: {
			pattern: '**/*.{gif,jpg,jpeg,png,svg}',
			parser: require('./lib/parse-imagemin')
		},
		jsmin: {
			pattern: '**/*.js',
			parser: require('./lib/parse-jsmin')
		},
		jsonmin: {
			pattern: '**/*.json',
			parser: require('./lib/parse-jsonmin')
		},
		xmlmin: {
			pattern: '**/*.xml',
			parser: require('./lib/parse-xmlmin')
		}
	}
};


function fastatic(options) {
	const config = defineConfig(defaults, options);

	const loader = new Spinner(`%s Crunching ${config.src}`);
	loader.setSpinnerString(18);
	loader.start();

	// 1. copy to temp dir
	const result = copy(config.src, config.temp)
		// 2. optimise files
		.then(() => parseAll(config))
		//// 3. revision files
		//// ...
		//// 4. display stats
		.then(() => stats(config))
		.then(output => console.log(output))
		.then(() => loader.stop())
		//// 5. copy to final dest
		.then(() => copy(config.temp, config.dest))
		.then(() => remove(config.temp))
		//// 6. report back to user
		.then(() => {return config})
		.catch(err => { // if anything goes wrong, we skip all steps, catch errors and remove temp
			remove(config.temp);
			loader.stop();
			throw new Error('Optimising failed.');
		});

	return result;
}


function defineConfig(defaults, options) {
	const config = merge({}, defaults, options);
	config.dest = config.dest || config.src;

	Object.keys(config.parsers).forEach(name => {
		if (!config.parsers[name]) {
			delete config.parsers[name];
		}
	});
	return config;
}

module.exports = fastatic;
