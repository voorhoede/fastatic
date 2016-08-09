const parser = require('./parser');
const htmlmin = require('gulp-htmlmin');

module.exports = parser([
	htmlmin({
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeAttributeQuotes: true,
		removeScriptTypeAttributes: true,
		sortAttributes: true,
		sortClassName: true,
		minifyJS: true,
		minifyCSS: true
	})
]);
