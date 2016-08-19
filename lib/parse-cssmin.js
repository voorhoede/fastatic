const parser = require('./parser');
const cleanCSS = require('gulp-clean-css');

module.exports = parser([
	cleanCSS({compatibility: 'ie8'})
]);
