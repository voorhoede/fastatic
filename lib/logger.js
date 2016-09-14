'use strict';

const colors = require('colors');
const stdout = require('mute-stdout');

let logLevel = null;

class Logger {
	constructor(level) {
		if (level && logLevel === null) {
			logLevel = Logger.levels()[level] || Logger.levels().silent;
		}

		stdout.mute();
	}

	error() {
		if (logLevel >= Logger.levels().error) {
			stdout.unmute();
			console.error.apply(null, [`${colors.red('error')}:  `].concat(arguments));
			stdout.mute();
		}
	}

	log() {
		if (logLevel >= Logger.levels().verbose) {
			stdout.unmute();
			console.log.apply(null, arguments);
			stdout.mute();
		}
	}

	warn() {
		if (logLevel >= Logger.levels().warn) {
			stdout.unmute();
			console.warn.apply(null, [`${colors.yellow('warning')}:`].concat(arguments));
			stdout.mute();
		}
	}

	static levels () {
		return {
			silent: 0,
			error: 1,
			warn: 2,
			verbose: 3
		}
	}
}

module.exports = Logger;
