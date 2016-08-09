const gulp = require("gulp");
const replace = require("gulp-replace");

gulp.src('./dist/examples/react/**/*.html')
	.pipe(replace('/react/', '/examples/react/'))
	.pipe(gulp.dest('./dist/examples/react'))



