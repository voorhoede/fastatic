const gulp = require("gulp");
const replace = require("gulp-replace");

gulp.src('./build/examples/react/**/*.html')
	.pipe(replace('/examples/react/', '/fastastic/examples/react/'))
	.pipe(gulp.dest('./build/examples/react'))



