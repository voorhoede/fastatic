const filesize = require('filesize');
const Logger = require('../logger');
const program = require('commander');
const statsReporter = require('./stats-reporter');

function reporter(output) {
	const logger = new Logger(program.logLevel);

	statsReporter(output.fileSize);

	logger.log(`Done. Optimised static files in: ${output.dest}`);
}

module.exports = reporter;
