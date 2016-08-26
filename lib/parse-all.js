const colors = require('colors');
const Deferred = require('./deferred');
const path = require('path');

function parseAll(config) {
	const parsing = Object.keys(config.parsers).reduce((map, name) => {
		map[name] = new Deferred();
		return map;
	}, {});

	return Promise.all(
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
	)
	.then((result) => {
		const parsersWithErrors = result
			.filter(res => res)
			.reverse()
			.map(parser => {
				console.log('\n');
				console.error(colors.red('  Parser:'), parser.name);
				console.error(colors.red('  Plugin:'), parser.error.plugin);
				console.error(colors.red('  Message:'), parser.error.cause.message);
				console.error(colors.red('  Where:'), `./${path.relative('.', parser.error.fileName)}:${parser.error.cause.line}:${parser.error.cause.col}`);
				console.log('\n---');

				return parser.name;
			});

		if (parsersWithErrors && parsersWithErrors.length) {
			console.log('\nSome parsers did not complete (see above for details):');
			parsersWithErrors.map(parser => console.log(colors.red(`  ${parser}`)));
			console.log('');
			throw new Error(parsersWithErrors);
		}
	});
}

module.exports = parseAll;
