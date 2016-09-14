const Logger = require('../logger');
const colors = require('colors');
const path = require('path');

const logger = new Logger();

function errorReporter(errors, logLevel) {
	logger.updateLevel(logLevel);

	if (errors.length) {
		logger.log('\nParser(s) with errors:');
	}

	errors
		.reverse()
		.map((parser, i, array) => {
			const seperator = (i < array.length - 1) ? '\n---' : '\n';

			logger.log('\n');
			logger.log(colors.red('  Parser:'), parser.name);
			logger.log(colors.red('  Plugin:'), parser.error.plugin);
			logger.log(colors.red('  Message:'), parser.error.cause.message);
			logger.log(colors.red('  Where:'), `./${path.relative(errors.cwd, parser.error.fileName)}:${parser.error.cause.line}:${parser.error.cause.col}`);
			logger.log(seperator);

			return parser.name;
		});
}

module.exports = errorReporter;
