const parser = require('./parser');
const uglify = require('gulp-uglify');

module.exports = parser([
    uglify()
]);