'use strict';

const colors = require('colors');
const filesize = require('filesize');
const Logger = require('../logger');
const percent = require('calc-percent');
const Table = require('cli-table');
const uniq = require('lodash/uniq');

const logger = new Logger();

function filesizeReporter(statsObj, logLevel) {
	logger.updateLevel(logLevel);
	const sizesPerType = calculateSizesPerType(statsObj.src, statsObj.dest);
	const table = createTable(sizesPerType);

	logger.log(table.toString());
}

function calculateSizesPerType(srcSizes, destSizes) {
	const srcTypes = Object.keys(srcSizes);
	const destTypes = Object.keys(destSizes);

	return uniq(srcTypes.concat(destTypes)).reduce((sizes, type) => {
		if (!srcSizes[type] || !destSizes[type]) return sizes;

		sizes[type] = {
			src: srcSizes[type],
			dest: destSizes[type],
			saving: srcSizes[type] - destSizes[type]
		}

		return sizes;
	}, {});
}

function createTable(tableData) {
	const table = new Table({
		head: [
			colors.blue('Filetype'),
			colors.blue('Original size'),
			colors.blue('Optimized size'),
			colors.blue('Saving')
		],
		colAligns: ['', 'right', 'right', 'right'],
		colWidths: [20, 20, 20, 20]
	});

	createTableRows(tableData)
		.concat([getTotalRow(tableData)])
		.map(row => table.push(row));

	return table;
}

function createTableRows(tableData) {
	return Object.keys(tableData).map(type => {
		const sizes = tableData[type];
		const row = [
			type,
			filesize(sizes.src),
			filesize(sizes.dest),
			filesize(sizes.saving) + ' (' + colors.green(percent(sizes.saving, [sizes.src], {suffix: '%'}))+ ')'
		];

		return (sizes.saving) ? row : [] ;
	})
	.filter(row => row.length);
}

function getTotalRow(tableData) {
	const total = Object.keys(tableData).reduce((total, type) => {
		total.src += tableData[type].src;
		total.dest += tableData[type].dest;
		total.saving += tableData[type].saving;
		return total;
	}, {src: 0, dest: 0, saving: 0});

	return [
		colors.bold(colors.green('Total')),
		colors.bold(filesize(total.src)),
		colors.bold(filesize(total.dest)),
		colors.bold(filesize(total.saving) + ' (' + colors.green(percent(total.saving, [total.src], {suffix: '%'}))+ ')')
	];
}

module.exports = filesizeReporter;
