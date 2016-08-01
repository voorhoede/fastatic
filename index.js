const promisify = require('bluebird').promisify;
const copy = promisify(require('ncp').ncp);
const remove = promisify(require('rimraf'));

const defaults = {
	src: './',
	dest: './',
	temp: './.fastatic-temp/',
	css: {
		pattern: '**/*.css',
		parser: require('./lib/parse-css')
	},
	html: {
		pattern: '**/*.html',
		parser: require('./lib/parse-html')
	},
	js: {
		pattern: '**/*.js',
		parser: require('./lib/parse-js')
	}
};


function parseAll(config) {
	return Promise.all([
		config.css.parser({ src: config.src, dest: config.temp, pattern: config.css.pattern }),
		config.html.parser({ src: config.src, dest: config.temp, pattern: config.html.pattern }),
		config.js.parser({ src: config.src, dest: config.temp, pattern: config.js.pattern })
	]);
}


function fastatic(options) {
	const config = Object.assign({}, defaults, options);

	// 1. copy to temp dir
	//copy(config.src, config.temp)
	// 2. optimise files (in parallel?)
	//.then(parseAll(config))
	parseAll(config)
	// 3. revision files
	// ...
	// 4. copy to final dest
	.then(() => copy(config.temp, config.dest))
	// 5. remove temp dir
	.catch(err => console.log('error', err)) // if anything goes wrong, we skip all steps, catch errors and remove temp
	//.then(() => remove(config.temp))
	// 6. create stats
	.then(() => console.log('Done. Optimised static files in', config.dest));
}

//fastatic({
//    src: 'examples/react-gh-pages/',
//    dest: 'examples/react/'
//});

if (require.main === module) {
	// if used from cli, parse arguments and call fastatic with it
	// @todo: move to bin.js / cli.js?
	const pkg = require('./package');
	const program = require('commander')
		.version(pkg.version)
		.description(`${pkg.name} (v${pkg.version}): ${pkg.description}`)
		.usage('<src> [options]')
		.option('-d, --dest [value]', 'Output destination')
		.parse(process.argv);

	if(!program.args[0]) {
		return;
	}

	fastatic({
		src: program.args[0],
		dest: program.dest
	});
}

module.exports = fastatic;
