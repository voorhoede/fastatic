const filesize = require('filesize');
const Logger = require('../logger');
const program = require('commander');
const statsReporter = require('./stats-reporter');
const errorReporter = require('./error-reporter');

function reporter(output) {
	const logger = new Logger(program.logLevel);
	const errors = output.parserErrors.filter(error => error);
	const totalErrors = errors.length;

	statsReporter(output.fileSize);
	errorReporter(errors, output.dest);

	logger.log(`Done${ totalErrors ? ' (with errors)': '' }. Optimised static files in: ${output.dest}`);
}

module.exports = reporter;
