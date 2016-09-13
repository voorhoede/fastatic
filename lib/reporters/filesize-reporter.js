'use strict';

const colors = require('colors');
const filesize = require('filesize');
const Logger = require('../logger');
const percent = require('calc-percent');
const Table = require('cli-table');

const logger = new Logger();

function filesizeReporter(filesizes, logLevel) {
	logger.updateLevel(logLevel);
	logger.log(createTable(filesizes.src, filesizes.dest).toString());
}

function createTable(srcObj, destObj) {
	const table = new Table(createHeaderData());
	const typeRows = Object.keys(srcObj).map(type => createTableRow(type, srcObj[type], destObj[type]));
	const totalRow = createTableRow('Total', calculateTotal(srcObj), calculateTotal(destObj));

	[...typeRows, totalRow.map(item => colors.bold(item))]
		.filter(row => row.length)
		.map(row => table.push(row));
	return table;
}

function createHeaderData() {
	return {
		head: [
			'Filetype',
			'Original size',
			'Optimized size',
			'Saving'
		].map(title => colors.blue(title)),
		colAligns: ['', 'right', 'right', 'right'],
		colWidths: [20, 20, 20, 20]
	}
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
