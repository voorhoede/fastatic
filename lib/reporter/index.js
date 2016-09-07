const filesize = require('filesize');
const statsReporter = require('./stats-reporter')

function reporter(output) {
	statsReporter(output.fileSize);
}

module.exports = reporter;
