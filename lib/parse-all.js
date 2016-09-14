'use strict';
const Deferred = require('./deferred');
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
					cwd: config.temp.dest,
					pattern: config.parsers[name].pattern
				}))
				.then(res => parsing[name].resolve(res))
				.catch(err => {
					parsing[name].reject(err);
					return { name: name, error: err };
				});
		})
	).then(result => {
		const errors = result.filter(error => error);
		progressBar.stop();

		if ( errors.length) {
			throw errors;
		}
	});

	return parsedAll;
}

module.exports = parseAll;
