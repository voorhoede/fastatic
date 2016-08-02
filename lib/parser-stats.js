'use strict';

const promisify = require('bluebird').promisify;
const Table = require('cli-table');
const glob = promisify(require('glob').glob);;
const filesize = require('filesize');
const percent = require('calc-percent');
const fs = require('fs');


var table = new Table({
	head: ['files', 'original size', 'optimized size', 'saving'],
});

function stats(config) {
	return Promise.all(
			Object.keys(config.parsers).map(function(name){
				return Promise.all([
					getSumOfFileSize(config.src, config.parsers[name].pattern),
					getSumOfFileSize(config.temp, config.parsers[name].pattern)
				])
			})
		).then(function (sizes) {
			let sumSrc = 0;
			let sumTemp = 0;
			sizes.map(function(parsers){
				let row = [];
				let src = parsers[0];
				let temp = parsers[1];
				let diff = src.sum - temp.sum;
				row.push(src.pattern);
				row.push(filesize(src.sum));
				sumSrc += src.sum;
				row.push(filesize(temp.sum));
				sumTemp += temp.sum;
				row.push(percent(diff, [src.sum], {suffix: '%'}));
				table.push(row);
			});

			let totalDiff = percent((sumSrc-sumTemp), sumSrc, {suffix: '%'});

			table.push(['Total:', filesize(sumSrc), filesize(sumTemp), totalDiff]);

			console.log(table.toString());

		}).catch(err => console.log(err))
}

function getSumOfFileSize(location, pattern) {

	return glob(location + pattern)
		.then(function(files) {
			return Promise.all(files.map(file => new Promise((resolve, reject) => {
				fs.stat(file, (err, stat) => err ? reject(err) : resolve(stat.size))
			})))
		})
		.then(function(sizes) {
			return {
				sum: sizes.reduce((prev, curr) => prev + curr),
				pattern: pattern
			}
		})
}

module.exports = stats;
