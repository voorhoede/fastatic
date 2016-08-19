const gulp = require("gulp");
const replace = require("gulp-replace");

gulp.src('./build/examples/react/**/*.html')
	.pipe(replace('/react/', '/examples/react/'))
	.pipe(gulp.dest('./build/examples/react'))



