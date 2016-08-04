const copy = require('./lib/copy');
const promisify = require('bluebird').promisify;
const remove = promisify(require('rimraf'));
const stats = require('./lib/parser-stats');

const defaults = {
	src: './',
	dest: './',
	temp: './.fastatic-temp/',
	parsers: {
		css: {
			pattern: '**/*.css',
			parser: require('./lib/parse-css')
		},
		html: {
			pattern: '**/*.html',
			parser: require('./lib/parse-html')
		},
		images: {
			pattern: '**/*.{gif,jpg,jpeg,png,svg}',
			parser: require('./lib/parse-images')
		},
		js: {
			pattern: '**/*.js',
			parser: require('./lib/parse-js')
		},
		json: {
			pattern: '**/*.json',
			parser: require('./lib/parse-json')
		}
	}
};


function fastatic(options) {
	const config = defineConfig(defaults, options);

	// 1. copy to temp dir
	copy(config.src, config.temp)
	// 2. optimise files
	.then(() => parseAll(config))
	//// 3. revision files
	//// ...
	//// 4. display stats
	.then(() => stats(config))
	.then(output => console.log(output))
	//// 5. copy to final dest
	.then(() => copy(config.temp, config.dest))
	.catch(err => console.log('error', err)) // if anything goes wrong, we skip all steps, catch errors and remove temp
	.then(() => remove(config.temp))
	.then(() => console.log('Done. Optimised static files in', config.dest));
}


function defineConfig(defaults, options) {
	const config = Object.assign({}, defaults, options);
	Object.keys(config.parsers).forEach(name => {
		if (!config.parsers[name]) {
			delete config.parsers[name];
		}
	});
	return config;
}


function parseAll(config) {
	return Promise.all(
		Object.keys(config.parsers).map(function(name) {
			return config.parsers[name].parser({
				src: config.src,
				dest: config.temp,
				pattern: config.parsers[name].pattern
			});
		})
	);
}


module.exports = fastatic;
