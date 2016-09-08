const merge = require('lodash/merge');

const defaults = {
	src: './',
	dest: undefined,
	temp: {
		root: './.fastatic-temp',
		src: './.fastatic-temp/src',
		dest: './.fastatic-temp/dest'
	},
	parsers: {
		cssmin: {
			pattern: '**/*.css',
			parser: require('./parse-cssmin')
		},
		fontrev: {
			pattern: '**/*.{eot,ttf,woff,woff2}',
			parser: require('./parse-fontrev')
		},
		htmlmin: {
			pattern: '**/*.html',
			parser: require('./parse-htmlmin')
		},
		imagemin: {
			pattern: '**/*.{gif,jpg,jpeg,png,svg}',
			parser: require('./parse-imagemin')
		},
		imagerev: {
			dependsOn: ['imagemin'],
			pattern: '**/*.{gif,jpg,jpeg,png,svg}',
			parser: require('./parse-imagerev')
		},
		jsmin: {
			pattern: '**/*.js',
			parser: require('./parse-jsmin')
		},
		jsonmin: {
			pattern: '**/*.json',
			parser: require('./parse-jsonmin')
		},
		xmlmin: {
			pattern: '**/*.xml',
			parser: require('./parse-xmlmin')
		}
	}
};

function defineConfig(options) {
	const config = merge({}, defaults, options);
	config.dest = config.dest || config.src;

	Object.keys(config.parsers).forEach(name => {
		if (!config.parsers[name]) {
			delete config.parsers[name];
		}
	});
	return config;
}

module.exports = defineConfig;
