const parser = require('./parser');
const jsonminify = require('gulp-jsonminify');

module.exports = parser([
	jsonminify()
]);
