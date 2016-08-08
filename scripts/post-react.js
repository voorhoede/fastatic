const gulp = require("gulp");
const replace = require("gulp-replace");

gulp.start('examples_react', function() {
	return gulp.src('./dist/examples/react/**/*.html')
		.pipe(replace('/react/', '/examples/react/'))
		.pipe(gulp.dest('./dist/examples/react'))
});


