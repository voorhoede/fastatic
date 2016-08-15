const defaults = {
	src: './',
	dest: undefined,
	temp: './.fastatic-temp/',
	parsers: {
		cssmin: {
			pattern: '**/*.css',
			parser: require('./parse-cssmin')
		},
		htmlmin: {
			dependsOn: ['imagesmin'],
			pattern: '**/*.html',
			parser: require('./parse-htmlmin')
		},
		imagesmin: {
			pattern: '**/*.{gif,jpg,jpeg,png,svg}',
			parser: require('./parse-imagesmin')
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
	},
	fileTypeDisplayName: {
		css: 'CSS',
		gif: 'Images',
		html: 'HTML',
		jpeg: 'Images',
		jpg: 'Images',
		js: 'JavaScript',
		json: 'JSON',
		png: 'Images',
		svg: 'Images',
		xml: 'XML'
	}
};

module.exports = defaults;
