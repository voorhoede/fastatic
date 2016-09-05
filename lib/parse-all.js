'use strict';
const colors = require('colors');
const Deferred = require('./deferred');
const path = require('path');
const parserProgressBar = require('./parser-progress-bar');

function parseAll(config) {
	const parsing = Object.keys(config.parsers).reduce((map, name) => {
		map[name] = new Deferred();
		return map;
	}, {});

	const progressBar = parserProgressBar(parsing);
	progressBar.start();

	const parsedAll = Promise.all(
		Object.keys(config.parsers).map((name) => {
			const parserObj = config.parsers[name];
			const deps = parserObj.dependsOn || [];
			return Promise.all(deps.map(dep => parsing[dep].promise))
				.then(() => config.parsers[name].parser({
					cwd: config.temp,
					pattern: config.parsers[name].pattern
				}))
				.then(res => parsing[name].resolve(res))
				.catch(err => {
					parsing[name].reject(err);
					return { name: name, error: err };
				});
		})
	);

	parsedAll.then(() => progressBar.stop());

	return parsedAll;
}

module.exports = parseAll;
