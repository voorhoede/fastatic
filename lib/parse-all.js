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
					err.parser = name;
					err.cwd = config.temp.dest;
					parsing[name].reject(err);
					return { error: err };
				});
		})
	).then(results => {
		progressBar.stop();

		const errors = results
			.map(result => (result && result.error) ? result.error : null)
			.filter(error => error);

		if (errors.length) {
			throw errors;
		}
	});

	return parsedAll;
}

module.exports = parseAll;
