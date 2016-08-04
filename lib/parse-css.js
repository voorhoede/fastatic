const parser = require('./parser');
const cleanCSS = require('gulp-clean-css');
const uncss = require('gulp-uncss');

function parseCss(config) {
	return parser([
		uncss({
			html: [`${config.src}**/*.html`]
		}),
		cleanCSS({ compatibility: 'ie8' })
	])(config);
}

module.exports = parseCss;
