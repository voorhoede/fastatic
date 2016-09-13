const Logger = require('../logger');
const program = require('commander');
const filesizeReporter = require('./filesize-reporter');

function reporter(output) {
	const logger = new Logger(program.logLevel);

	filesizeReporter(output.fileSize);

	logger.log(`Done. Optimised static files in: ${output.dest}`);
}

module.exports = reporter;
