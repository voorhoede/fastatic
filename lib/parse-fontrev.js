const parseRev = require('./parse-rev');

module.exports = function(config) {
	return parseRev(Object.assign({}, config, { name: 'fontrev' }))
};
