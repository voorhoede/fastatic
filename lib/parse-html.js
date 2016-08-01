const parser = require('./parser');
const htmlmin = require('gulp-htmlmin');

module.exports = parser([
    htmlmin({
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    })
]);