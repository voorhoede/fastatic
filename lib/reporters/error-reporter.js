const Logger = require('../logger');
const colors = require('colors');
const path = require('path');
const isArray = require('lodash/isArray');

const logger = new Logger();

function errorReporter(error, logLevel) {
	logger.updateLevel(logLevel);
	const errors = (isArray(error)) ? error : [error];

	logger.log('\nCaught errors:\n');

	const errorStr = errors
		.map(error => formatError(error))
		.join('\n---\n');

	logger.log(errorStr);
}

function formatError(error) {
	const { cwd, fileName } = error || {};
	const { lineNr, colNr, message } = error.cause || {};
	const where = (cwd && fileName) ? `${path.relative(cwd, fileName)}:${lineNr}:${colNr}` : null ;

	const format = {
		name: error.name,
		parser: error.parser,
		plugin: error.plugin,
		message: message || error.message,
		where: where || error.stack.split('\n    ').slice(1).join('\n\t ')
	}

	return Object.keys(format)
		.map(key => (format[key]) ? `${colors.red(`  ${key}`)}: ${format[key]}\n` : '')
		.join('');
}

module.exports = errorReporter;
