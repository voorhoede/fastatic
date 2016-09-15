'use strict';

const colors = require('colors');
const filesize = require('filesize');
const logger = require('../logger');
const percent = require('calc-percent');
const Table = require('cli-table');

const tableConfig = {
	head: ['Filetype', 'Original size', 'Optimized size', 'Saving'].map(title => colors.blue(title)),
	colAligns: ['', 'right', 'right', 'right'],
	colWidths: [20, 20, 20, 20]
};

function filesizeReporter(filesizes) {
	logger.log(createTable(filesizes.src, filesizes.dest).toString());
}

function createTable(srcObj, destObj) {
	const table = new Table(tableConfig);
	const rows = Object.keys(srcObj)
		.map(type => createTableRow(type, srcObj[type], destObj[type]))
		.filter(row => row.length);

	const footer = createTableRow('Total', calculateTotal(srcObj), calculateTotal(destObj))
		.map(item => colors.bold(item));

	[...rows, footer]
		.map(row => table.push(row));

	return table;
}

function createTableRow(type, srcSize, destSize) {
	const saving = srcSize - destSize;
	const row = [
		type,
		filesize(srcSize),
		filesize(destSize),
		filesize(saving) + ' (' + colors.green(percent(saving, [srcSize], {suffix: '%'}))+ ')'
	];
	return (saving) ? row : [] ;
}

function calculateTotal(size) {
	return Object.keys(size).reduce((total, type) => total + size[type], 0);
}


module.exports = filesizeReporter;
