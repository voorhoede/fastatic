const parser = require('./parser');
const prettyData = require('gulp-pretty-data');

module.exports = parser([
	prettyData({
		type: 'minify'
	})
]);
