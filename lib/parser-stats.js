const promisify = require('bluebird').promisify;
const Table = require('cli-table');
const glob = promisify(require('glob').glob);
const filesize = require('filesize');
const percent = require('calc-percent');
const fs = require('fs');


function stats(config) {
	return Promise.all(
			Object.keys(config.parsers).map(function(name){
				return Promise.all([
					getSumOfFileSize(config.src, config.parsers[name].pattern),
					getSumOfFileSize(config.temp, config.parsers[name].pattern)
				])
			})
		)
		.then(sizes => createSizesTable(sizes).toString());
}


function getSumOfFileSize(location, pattern) {
	return glob(location + pattern)
		.then(function(files) {
			return Promise.all(files.map(file => new Promise((resolve, reject) => {
				fs.stat(file, (err, stat) => err ? reject(err) : resolve(stat.size))
			})))
		})
		.then(sizes => ({
			sum: sizes.reduce((prev, curr) => prev + curr),
			pattern: pattern
		}))
}


function createSizesTable(sizes) {
	const table = new Table({
		head: ['files', 'original size', 'optimized size', 'saving']
	});

	const sums = sizes
		.map(parsers => {
			const row = [];
			const src = parsers[0];
			const temp = parsers[1];
			const diff = src.sum - temp.sum;

			row.push(src.pattern);
			row.push(filesize(src.sum));
			row.push(filesize(temp.sum));
			row.push(percent(diff, [src.sum], {suffix: '%'}));
			table.push(row);

			return {
				src: src.sum,
				temp: temp.sum
			};
		})
		.reduce((sums, row) => ({
			src: sums.src + row.src,
			temp: sums.temp + row.temp
		}), { src: 0, temp: 0 });

	const totalDiff = percent((sums.src - sums.temp), sums.src, {suffix: '%'});

	table.push(['Total:', filesize(sums.src), filesize(sums.temp), totalDiff]);

	return table;
}


module.exports = stats;
