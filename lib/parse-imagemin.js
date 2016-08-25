const parser = require('./parser');
const imagemin = require('gulp-imagemin');
const imageminSvgo = require('imagemin-svgo');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

module.exports = parser([
	imagemin({
		plugins: [
			imageminMozjpeg(),
			imageminPngquant({quality: '65-80'}),
			imageminSvgo()
		]
	})
]);
