'use strict';

const colors = require('colors');
const filesize = require('filesize');
const Logger = require('../logger');
const percent = require('calc-percent');
const program = require('commander');
const Table = require('cli-table');
const uniq = require('lodash/uniq');

const logger = new Logger();

function statsReporter(statsObj) {
	logger.updateLevel(program.logLevel);
	const sizesPerType = getSizesPerType(statsObj.src, statsObj.dest);
	const tableData = calculateSavingsPerType(sizesPerType);
	const table = generateTable(tableData);

	logger.log(table.toString());
}

function getSizesPerType(srcSizes, destSizes) {
	const srcTypes = Object.keys(srcSizes);
	const destTypes = Object.keys(destSizes);

	return uniq(srcTypes.concat(destTypes)).reduce((sizes, type) => {
		if (!srcSizes[type] || !destSizes[type]) return sizes;

		sizes[type] = {
			src: srcSizes[type],
			dest: destSizes[type]
		}

		return sizes;
	}, {});
}

function calculateSavingsPerType(sizes) {
	return Object.keys(sizes).reduce((collection, type) => {
		const savedBytes = sizes[type].src - sizes[type].dest;
		collection[type] = Object.assign(sizes[type], { saving: savedBytes });

		return collection;
	}, {});
}

function generateTable(tableData) {
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

	getTableRows(tableData)
		.concat([getTotalRow(tableData)])
		.map(row => table.push(row));

	return table;
}

function getTableRows(tableData) {
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

module.exports = statsReporter;
