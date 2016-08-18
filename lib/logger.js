const colors = require('colors');
const stdout = require('mute-stdout');

function error(...rest) {
	stdout.unmute();
	console.error.apply(null, [`${colors.red('error')}:`].concat(rest));
	stdout.mute();
}

function log() {
	stdout.unmute();
	console.log.apply(null, arguments);
	stdout.mute();
}

function warn(...rest) {
	stdout.unmute();
	console.warn.apply(null, [`${colors.yellow('warning')}:`].concat(rest));
	stdout.mute();
}

module.exports = {
	error,
	log,
	warn
};
