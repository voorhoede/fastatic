const Logger = require('../logger');
const program = require('commander');
const colors = require('colors');
const path = require('path');

const logger = new Logger();

function errorReporter(errors, destDir) {
	logger.updateLevel(program.logLevel);

	if (errors.length) {
		logger.log('\nParser(s) with errors:');
	}

	errors
		.reverse()
		.map((parser, i, array) => {
			logger.log('\n');
			logger.log(colors.red('  Parser:'), parser.name);
			logger.log(colors.red('  Plugin:'), parser.error.plugin);
			logger.log(colors.red('  Message:'), parser.error.cause.message);
			logger.log(colors.red('  Where:'), `./${path.relative('.', parser.error.fileName)}:${parser.error.cause.line}:${parser.error.cause.col}`);

			if (i < array.length - 1) {
				logger.log('\n---');
			} else {
				logger.log('\n');
			}

			return parser.name;
		});
}

module.exports = errorReporter;
