'use strict';
module.exports = typeof setImmediate === 'function' ? setImmediate :
	function setImmediate(fn) {
		var args = [].slice.apply(arguments).splice(1, 0, 0);
		setTimeout.apply(null, args);
	};
