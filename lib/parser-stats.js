const colors = require('colors');
const filesize = require('filesize');
const fs = require('fs');
const promisify = require('bluebird').promisify;
const glob = promisify(require('glob').glob);
const includes = require('lodash/includes');
const merge = require('lodash/merge');
const path = require('path');
const percent = require('calc-percent');
const Table = require('cli-table');


function stats(config) {
	config.parsers['all'] = {};
	config.parsers['all'].pattern = "**/*";
	return Promise.all(
			Object.keys(config.parsers).map(function(name){
				return Promise.all([
					getSumOfFileSize(config.src, config.parsers[name].pattern),
					getSumOfFileSize(config.temp, config.parsers[name].pattern)
				])
			})
		)
		.then(sizes => addDisplayName(sizes, config))
		.then(sizes => createSizesTable(sizes).toString());
}


function getSumOfFileSize(location, pattern) {
	return glob(path.join(location, pattern))
		.then(function(files) {
			return Promise.all(files.map(file => new Promise((resolve, reject) => {
				fs.stat(file, (err, stat) => err ? reject(err) : resolve(stat.size))
			})))
		})
		.then(sizes => ({
			sum: sizes.reduce((prev, curr) => prev + curr, 0),
			pattern: pattern
		}))
}

function addDisplayName(sizes, config) {
	const fileTypesMap = config.fileTypeDisplayName;
	const fileTypes = Object.keys(fileTypesMap);
	const augmentedSizes = sizes.map((size) => {
		return size.map((s) => {
			const fileTypeRe = /(?:\.)(?:{*)([\w,]+)(?:}*)$/ig;
			const fileTypeMatch = fileTypeRe.exec(s.pattern);
			const matchedFileTypes = (fileTypeMatch) ? fileTypeMatch[1].split(',') : [ '' ];
			const fileTypeInMap = matchedFileTypes.some((type) => includes(fileTypes, type));
			const displayName = (fileTypeInMap && fileTypesMap[matchedFileTypes[0]]) ? { displayName: fileTypesMap[matchedFileTypes[0]] } : {};

			return merge(s, displayName);
		})
	});
	return sizes;
}

function createSizesTable(sizes) {
	const table = new Table({
		head: [
			colors.blue('Filetype'),
			colors.blue('Original size'),
			colors.blue('Optimized size'),
			colors.blue('Saving')
		],
		colAligns: ['', 'right', 'right', 'right']
	});

	sizes
		.map(parsers => {
			const row = [];
			const src = parsers[0];
			const temp = parsers[1];
			const diff = src.sum - temp.sum;
			const isTotal = src.pattern !== '**/*';

			if(isTotal) {
				row.push(src.displayName || src.pattern);
			} else {
				row.push(colors.bold.green('Total'));
			}

			if(isTotal) {
				row.push(filesize(src.sum));
				row.push(filesize(temp.sum));
				row.push(filesize(diff) + ' (' + colors.green(percent(diff, [src.sum], {suffix: '%'}))+ ')');
			} else {
				row.push(colors.bold(filesize(src.sum)));
				row.push(colors.bold(filesize(temp.sum)));
				row.push(colors.bold(filesize(diff) + ' (' + colors.green(percent(diff, [src.sum], {suffix: '%'}))+ ')'));
			}

			if(temp.sum) {
				table.push(row);
			}

			return {
				src: src.sum,
				temp: temp.sum
			};
		})
		.reduce((sums, row) => ({
			src: sums.src + row.src,
			temp: sums.temp + row.temp
		}), { src: 0, temp: 0 });

	return '\n' + table;
}


module.exports = stats;
