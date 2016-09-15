const stdout = require('mute-stdout');
const colors = require('colors');

const levels = {
	silent: 0,
	error: 1,
	warn: 2,
	verbose: 3
}
let logLevel = levels.silent;

const logger = {
	error() {
		if (logLevel >= levels.error) {
			stdout.unmute();
			console.error.apply(null, [`${colors.red('error')}:  `, ...arguments]);
			stdout.mute();
		}
	},

	log() {
		if (logLevel >= levels.verbose) {
			stdout.unmute();
			console.log.apply(null, arguments);
			stdout.mute();
		}
	},

	warn() {
		if (logLevel >= levels.warn) {
			stdout.unmute();
			console.warn.apply(null, [`${colors.yellow('warning')}:`, ...arguments]);
			stdout.mute();
		}
	},

	setLogLevel(level) {
		logLevel = levels[level] || levels.silent;
	}
}

function startLogger() {
	stdout.mute();
	return logger;
}

module.exports = startLogger();
