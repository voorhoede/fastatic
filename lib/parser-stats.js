const promisify = require('bluebird').promisify;
const Table = require('cli-table');
const glob = promisify(require('glob').glob);;
const filesize = require('filesize');
const fs = require('fs');


var table = new Table({
	head: ['files', 'original size', 'optimized size', 'saving']
});


function stats(config) {
	return Promise.all(
			config.parsers.map(function(item){
				return Promise.all([
					getSumOfFileSize(`${config.src}${item.pattern}`),
					getSumOfFileSize(`${config.dest}${item.pattern}`)
				])
			})
		).then(sizes => {
			table.push(sizes);
			console.info(table.toString());
		})
}

function getSumOfFileSize(pattern) {

	return glob(pattern)
		.then(function(files) {
			return Promise.all(files.map(file => new Promise((resolve, reject) => {
				fs.stat(file, (err, stat) => err ? reject(err) : resolve(stat.size))
			})))
		})
		.then(function(sizes) {
			return sizes.reduce((prev, curr) => prev + curr)
		})
}

module.exports = stats;
