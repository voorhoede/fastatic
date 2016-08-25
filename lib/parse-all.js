'use strict';

const Deferred = require('./deferred');
const Logger = require('./logger');
const progress = require('cli-progress');

function parseAll(config) {
	const logger = new Logger(config.logLevel);
	const progressBar = new progress.Bar({ format: 'Optimising: [{bar}] {value} / {total}', 'clearOnComplete': true});
	const totalParsers = Object.keys(config.parsers).length;
	const parsing = Object.keys(config.parsers).reduce((map, name) => {
		map[name] = new Deferred();
		return map;
	}, {});

	let completedParsers = 0;

	progressBar.start(totalParsers, 0);

	Object.keys(parsing).map((name) => {
		parsing[name].promise.then(() => {
			completedParsers++;
			progressBar.update(completedParsers);
		})
	})

	return Promise.all(
		Object.keys(config.parsers).map((name) => {
			const parserObj = config.parsers[name];
			const deps = parserObj.dependsOn || [];
			return Promise.all(deps.map(dep => parsing[dep].promise))
				.then(() => config.parsers[name].parser({
					src: config.src,
					dest: config.temp,
					pattern: config.parsers[name].pattern
				}))
				.then(res => parsing[name].resolve(res))
				.catch(err => parsing[name].reject(err));
		})
	)
	.then((result) => {
		progressBar.stop();
		return result;
	});
}

module.exports = parseAll;
