'use strict';

const progress = require('cli-progress');

/**
 * @param {Object} parsing							mapping of deferred object for each parer
 * @returns {{start: Function, stop: Function}} 	progress bar for parser
 */
function parserProgressBar (parsing) {
	const format = 'Optimising: [{bar}] {value} / {total}';
	const progressBar = new progress.Bar({ format, 'clearOnComplete': true});
	const totalParsers = Object.keys(parsing).length;

	let completedParsers = 0;

	Object.keys(parsing).map((name) => {
		parsing[name].promise.then(() => {
			completedParsers++;
			progressBar.update(completedParsers);
		})
	});

	return {
		start: () => progressBar.start(totalParsers, 0),
		stop: () => progressBar.stop()
	}
}

module.exports = parserProgressBar;
